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
  const chartData = {
    labels: ["Python", "Java", "JavaScript", "C#", "Others"],
    data: [30, 17, 10, 7, 36]
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
      borderWidth: 10,
      borderRadius: 2,
      hoverBorderWidth: 0,
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
};

// Renders
router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
      // Trigger chart creation when rendering the Home view to make sure chart is rendered anytime the Home page is viewed
      if (view === "Home") {
        createChart();
      }
    }
  })
  .resolve();
