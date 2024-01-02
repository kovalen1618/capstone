import html from "html-literal";

export default () => html`
  <div id="home-wrapper">
    <div id="tasks">
      <h1>Tasks Content</h1>

      <div id="chart-container">
        <canvas id="task-chart"></canvas>
      </div>

      <div id="task-details">
        <ul></ul>
      </div>
    </div>
    <div id="small-reminder">
      <h3>Clocks</h3>
    </div>
    <div id="medium-reminder">
      <h2>Graphs</h2>
    </div>
  </div>
`;
