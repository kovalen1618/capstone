import Navigo from "navigo";
import { capitalize } from "lodash";

import * as components from "./components";
import * as store from "./store";

// ! When reloading a page, the url is stuck on the last view i.e. reloading on /Contact leaves the
// ! user on /Contact, but the /Home view is displayed instead - so, when attempting to change the
// ! view to /Contact again, you can't unless you click another link first
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

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${components.Nav(store.Links)}
    ${components.Main(state)}
  `;
  router.updatePageLinks();
}

render();

// Selecting parent element that won't change when the DOM changes (the #root in this case)
// Previously selecting the child #chevron element caused the eventListener to not work as it
// could not find the child #chevron
const rootContainer = document.getElementById("root");
const sidebar = document.getElementById("sidebar");
const chevron = document.getElementById("chevron");
const main = document.querySelector("main");

rootContainer.addEventListener("click", mobileMenu);

function mobileMenu() {
  sidebar.classList.toggle("active");
  chevron.classList.toggle("active");
  main.classList.toggle("active");
}
