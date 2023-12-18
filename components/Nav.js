import html from "html-literal";

export default (links, state) => html`
  <i id="chevron" class="fa-solid fa-chevron-right"></i>

  <nav id="sidebar">
    <!-- Try using grid in CSS and add an extra HTML <div> between the icons and text with a width of 20px -->
    <ul>
      ${links
    .map(
      link =>
        `<li><a class="${link.style} ${link.title === state.view ? "active" : " "
        }" href="/${link.title}"
        title="${link.title}" data-navigo>${link.icon}${link.text}</a></li>`
    )
    .join("")}
    </ul>

    <footer>
      by Ethan Kovalenko
    </footer>
  </nav>
`;
