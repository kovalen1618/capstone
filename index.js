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
const createChart = () => {
  // ? When database is implemented, be sure to find a way to populated chartData with data from MongoDB
  // Tasks Chart
  const chartData = {
    labels: [
      "Sleep",
      "Exercise: Run",
      "Rest",
      "Work: Coding",
      "Rest",
      "School",
      "Study: Coding",
      "Gaming",
      "Rest"
    ],
    data: [33, 5, 5, 15, 5, 18, 10, 5, 4]
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

  // const populateUl = () => {
  //   chartData.labels.forEach((l, i) => {
  //     let li = document.createElement("li");
  //     li.innerHTML = `${l}: <span class='percentage'>${chartData.data[i]}%</span>`;
  //     ul.appendChild(li);
  //   });
  // };

  // populateUl();

  // Graphs Chart
  const graphData = {
    labels: [
      "Sleep",
      "Exercise: Run",
      "Rest",
      "Work: Coding",
      "Rest",
      "School",
      "Study: Coding",
      "Gaming",
      "Rest"
    ],
    datasets: [
      {
        label: "Jan 1st - Jan 7th",
        data: [33, 5, 5, 15, 5, 18, 10, 5, 4],
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
    createChart();
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
      // Trigger chart creation when rendering the Home view to make sure chart is rendered anytime the Home page is viewed
      // ! Still buggy, doesn't render immediately all the time - also doesn't load immediately on first render of "/"
      // if (view === "Home") {
      //   createChart();
      // }
    }
  })
  .resolve();
