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
  // Initialize empty arrays to store each parts of tasks to be displayed in charts
  const titles = [];
  const types = [];
  const exercises = [];
  const times = [];
  const notes = [];
  const colors = [];

  // Push each part of task objects into respective data
  for (let task of state.tasks) {
    titles.push(task.title);
    types.push(task.type);
    exercises.push(task.exercise);
    // Accepts seconds input and calculates out of an 86400s day
    times.push(Math.round((task.time / 86400) * 100));
    notes.push(task.notes);
    colors.push(task.color);
  }

  // Chart Data
  const chartData = {
    titles,
    types,
    exercises,
    times,
    notes,
    colors
  };

  // Testing
  console.log("Titles: ", titles);
  console.log("Types: ", types);
  console.log("Exercises: ", exercises);
  console.log("Times: ", times);
  console.log("Notes: ", notes);
  console.log("Colors: ", colors);

  // Selecting canvas element from DOM
  const taskChart = document.querySelector("#task-chart");
  const taskDetails = document.querySelector("#task-details");

  // Circle dougnut chart
  const doughnutChart = new Chart(taskChart, {
    type: "doughnut",
    data: {
      labels: {
        title: chartData.titles,
        type: chartData.types,
        exercise: chartData.exercises,
        notes: chartData.notes
      },
      datasets: [
        {
          data: chartData.times,
          backgroundColor: chartData.colors
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

  const displayTaskDetails = (title, type, exercise, percentage, notes) => {
    const time = (percentage / 100) * 24;

    let h2 = document.createElement("h2");
    h2.textContent = title;
    let h3 = document.createElement("h3");
    h3.textContent = type;
    let h4 = document.createElement("h4");
    h4.textContent = exercise;
    let h5 = document.createElement("h5");
    h5.textContent = time;
    let p = document.createElement("p");
    p.textContent = notes;

    taskDetails.appendChild(h2);
    taskDetails.appendChild(h3);
    if (exercise) taskDetails.appendChild(h4);
    taskDetails.appendChild(h5);
    taskDetails.appendChild(p);
  };

  // Event listener to look for a click event on the #task-chart canvas
  taskChart.addEventListener("click", e => {
    // Check coordinates on canvas to see which arc of the doughnut chart
    // is being selected and then add that coordinate point to an array
    const points = doughnutChart.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );

    const taskOptions = document.getElementById("task-options");
    const deleteButton = document.getElementById("delete-button");

    // If a coordinate has been chosen, then it will be in the points array
    // and allows for some functionality to occur after the 'click' event
    if (points.length) {
      const firstPoint = points[0];
      const title = doughnutChart.data.labels.title[firstPoint.index];
      const type = doughnutChart.data.labels.type[firstPoint.index];
      const exercise = doughnutChart.data.labels.exercise[firstPoint.index];
      const percentage =
        doughnutChart.data.datasets[firstPoint.datasetIndex].data[
        firstPoint.index
        ];
      const notes = doughnutChart.data.labels.notes[firstPoint.index];
      // Remove contents of task-details to avoid stacking
      taskDetails.textContent = "";
      // Display task info under #task-chart
      displayTaskDetails(title, type, exercise, percentage, notes);
      // Display task options
      taskOptions.classList.add("active");

      deleteButton.addEventListener("click", e => {
        e.preventDefault();

        const postIdToDelete = state.tasks[firstPoint.index]._id;

        axios
          .delete(`${process.env.TASKS_API_URL}/home/${postIdToDelete}`)
          .then(response => {
            console.log(`Deleted post with ID ${postIdToDelete}`);
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      });

      doughnutChart.update();
    }
  });

  const typeTimeArray = [];

  for (let i = 0; i < chartData.times.length; i++) {
    typeTimeArray.push({
      type: chartData.types[i],
      time: chartData.times[i]
    });
  }

  const timeSumsArray = Array.from(
    typeTimeArray.reduce(
      (map, { type, time }) => map.set(type, (map.get(type) || 0) + time),
      new Map()
    ),
    ([type, time]) => ({ type, time })
  );

  const dataTypes = ["Exercise", "Other", "Sleep", "Study", "Work"];
  const dataTimes = [];

  const sortGraphData = (data, times) => {
    // Sort times array of objects based on object.type
    times.sort(function (a, b) {
      const typeA = a.type.toUpperCase();
      const typeB = b.type.toUpperCase();

      if (typeA < typeB) {
        return -1;
      }

      if (typeA > typeB) {
        return 1;
      }

      return 0;
    });

    // Loop through data array, checking if times array of objects includes
    // matching object.type at same index || add zero if not found
    for (let i = 0; i < data.length; i++) {
      switch (times.map(e => e.type).indexOf(data[i])) {
        case -1:
          dataTimes.push(0);
          break;
        case 0:
          dataTimes.push(times[0].time);
          times.shift();
          break;
        case 1:
          dataTimes.push(times[0].time);
          times.shift();
          break;
        case 2:
          dataTimes.push(times[0].time);
          times.shift();
          break;
        case 3:
          dataTimes.push(times[0].time);
          times.shift();
          break;
      }
    }
  };

  sortGraphData(dataTypes, timeSumsArray);

  const graphData = {
    labels: dataTypes,
    datasets: [
      {
        // Have the dataset label represent the current week
        label: "Jan 1st - Jan 7th",
        data: dataTimes,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)"
      }
    ],
    options: {
      parsing: {
        key: "time"
      }
    }
  };

  // Graphs Chart
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
  // Mobile Sidebar
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

  // Create Charts on Home View
  if (state.view === "Home") {
    createChart(state);
  }

  // Create View
  if (state.view === "Create") {
    // Alter form based on type
    const createForm = document.getElementById("create-form");
    const typeInput = document.getElementById("type-input");

    typeInput.addEventListener("input", e => {
      e.preventDefault();

      const exerciseInput = document.getElementById("exercise-input");

      if (typeInput.value === "Exercise") {
        exerciseInput.classList.add("active");
      }

      if (typeInput.value !== "Exercise") {
        exerciseInput.classList.remove("active");
      }
    });

    // Send POST request on "submit" form event
    createForm.addEventListener("submit", e => {
      e.preventDefault();

      const inputList = e.target.elements;
      console.log("Input Element List", inputList);

      console.log("Colors: ", inputList.color.value);

      const requestData = {
        title: inputList.title.value,
        type: inputList.type.value,
        exercise: inputList.exercise.value,
        time: inputList.time.value,
        notes: inputList.notes.value,
        color: inputList.color.value
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
            `https://wger.de/api/v2/exercise/?language=2&appid=${process.env.WGER_API_KEY}`
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
