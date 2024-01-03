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
  afterRender();
}

// DOM Manipulation of view constant sidebar during mobile display
function afterRender() {
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
          label: "Language Popularity",
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
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)"
        ]
      },
      {
        label: "Jan 8th - 14th",
        data: [30, 8, 5, 10, 10, 10, 5, 23, 4],
        fill: true,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(201, 203, 207, 1)"
        ]
      }
    ]
  };

  const graphChart = document.querySelector("#graph-chart");

  new Chart(graphChart, {
    type: "bar",
    data: graphData,
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};

// Renders
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
      // Trigger chart creation when rendering the Home view to make sure chart is rendered anytime the Home page is viewed
      // ! Still buggy, doesn't render immediately all the time - also doesn't load immediately on first render of "/"
      if (view === "Home") {
        createChart();
      }
    }
  })
  .resolve();
