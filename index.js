import Navigo from "navigo";
import { capitalize } from "lodash";

import * as components from "./components";
import * as store from "./store";

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${components.Nav(store.Links, state)}
    ${components.Main(state)}
  `;
  router.updatePageLinks();
}

const router = new Navigo("/");
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
