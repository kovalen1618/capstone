import html from "html-literal";
import logoImage from "../documents/img/logo.png";

export default () => html`
  <nav id="sidebar">
    <h1 id="header">
      <a href="./index.html">
        <img id="logo" src="${logoImage}" alt="Priora Logo" />
      </a>
    </h1>

    <!-- Try using grid in CSS and add an extra HTML <div> between the icons and text with a width of 20px -->
    <ul>
      <a class="menu-link" href="./create.html">
        <i class="fa-solid fa-circle-plus"></i>
        <span class="menu-text">Add Task</span>
      </a>
      <a class="menu-link" href="./badges.html">
        <i class="fa-solid fa-award"></i>
        <span class="menu-text">Badges</span>
      </a>
      <a class="menu-link" href="./about.html">
        <i class="fa-solid fa-scroll"></i>
        <span class="menu-text">About</span>
      </a>
      <a class="menu-link" href="./contact.html">
        <i class="fa-solid fa-envelope"></i>
        <span class="menu-text">Contact</span>
      </a>
      <a class="menu-link" href="./settings.html">
        <i class="fa-solid fa-gear"></i>
        <span class="menu-text">Settings</span>
      </a>
    </ul>

    <footer>
      by Ethan Kovalenko
    </footer>
  </nav>
`;
