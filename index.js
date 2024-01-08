import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

import * as components from "./components";
import * as store from "./store";

import { Chart } from "chart.js/auto";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
      ${components.Nav(store.Links, state)}
      ${components.Main(state)}
    `;
  router.updatePageLinks();
  afterRender(state);
}

// ChartJS
const createChart = state => {
  const labels = [];
  const data = [];

  for (let task of state.tasks) {
    labels.push(task.title);

    // Accepts seconds input and calculates out 86400s day
    data.push(Math.round((task.time / 86400) * 100));
  }

  // ? When database is implemented, be sure to find a way to populated chartData with data from MongoDB
  // Tasks Chart
  const chartData = {
    labels: labels,

    data: data
  };

  const taskChart = document.querySelector("#task-chart");
  const ul = document.querySelector("#task-details ul");

  new Chart(taskChart, {
    type: "doughnut",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "Tasks",
          data: chartData.data
        }
      ]
    },
    options: {
      borderWidth: 0,
      borderRadius: 2,
      hoverBorderWidth: 5,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  const populateUl = () => {
    chartData.labels.forEach((l, i) => {
      let li = document.createElement("li");
      li.innerHTML = `${l}: <span class='percentage'>${chartData.data[i]}%</span>`;
      ul.appendChild(li);
    });
  };

  populateUl();

  // Graphs Chart
  const graphData = {
    labels: labels,
    datasets: [
      {
        // Have the dataset label represent the current week
        label: "Jan 1st - Jan 7th",
        data: data,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)"
      }
    ]
  };

  const graphChart = document.querySelector("#graph-chart");

  new Chart(graphChart, {
    type: "radar",
    data: graphData,
    options: {
      // Styling for the radar background
      scales: {
        r: {
          angleLines: {
            color: "rgba(255, 255, 255, 0.3)"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.3)"
          },
          pointLabels: {
            color: "rgb(255, 255, 255)"
          },
          ticks: {
            color: "rgb(255, 255, 255)",
            backdropColor: "rgb(0, 0, 0)"
          }
        }
      },
      elements: {
        line: {
          borderWidth: 1
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};

// DOM Manipulation of view constant sidebar during mobile display
function afterRender(state) {
  const sidebar = document.getElementById("sidebar");
  const chevron = document.getElementById("chevron");
  const main = document.querySelector("main");

  chevron.addEventListener("click", e => {
    if (e.target.matches("#chevron")) {
      mobileMenu();
    }
  });

  function mobileMenu() {
    sidebar.classList.toggle("active");
    chevron.classList.toggle("active");
    main.classList.toggle("active");
  }

  if (state.view === "Home") {
    createChart(state);
  }

  if (state.view === "Create") {
    document.getElementById("create-form").addEventListener("submit", e => {
      e.preventDefault();

      const inputList = e.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        title: inputList.title.value,
        type: inputList.type.value,
        time: inputList.time.value,
        notes: inputList.notes.value
      };
      axios
        .post(`${process.env.TASKS_API_URL}/home`, requestData)
        .then(response => {
          store.Home.tasks.push(response.data);
          router.navigate("/Home");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }
}

router.hooks({
  before: (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Home":
        axios
          .get(`${process.env.TASKS_API_URL}/home`)
          .then(response => {
            console.log("response", response);
            store.Home.tasks = response.data;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      // Load on Create page to choose exercises
      case "Create":
        axios
          .get(
            `https://wger.de/api/v2/exercise?appid=${process.env.WGER_API_KEY}`
          )
          .then(response => {
            console.log("response", response);
            store.Create.exercises = response.data;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    render(store[view]);
  }
});

// Renders
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
