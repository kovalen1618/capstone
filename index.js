import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

import * as components from "./components";
import * as store from "./store";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${components.Nav(store.Links, state)}
    ${components.Main(state)}
  `;
  router.updatePageLinks();
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

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();

// Selecting parent element that won't change when the DOM changes (the #root in this case)
// Previously selecting the child #chevron element caused the eventListener to not work as it
// could not find the child #chevron
const rootContainer = document.getElementById("root");

// Event delegation for a working post-SPA chevron
rootContainer.addEventListener("click", e => {
  if (e.target.matches("#chevron")) {
    mobileMenu();
  }
});

function mobileMenu() {
  const sidebar = document.getElementById("sidebar");
  const chevron = document.getElementById("chevron");
  const main = document.querySelector("main");

  sidebar.classList.toggle("active");
  chevron.classList.toggle("active");
  main.classList.toggle("active");
}
