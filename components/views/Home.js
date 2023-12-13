import html from "html-literal";

export default () => html`
  <div id="reminders-wrapper">
    <div id="large-reminder" class="home-reminder">
      <h1>Tasks Content</h1>
    </div>
    <div id="small-reminder" class="home-reminder">
      <h3>Clocks</h3>
    </div>
    <div id="medium-reminder" class="home-reminder">
      <h2>Graphs</h2>
    </div>
  </div>
`;
