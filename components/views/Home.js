import html from "html-literal";

export default () => html`
  <div id="home-wrapper">
    <div id="tasks">
      <h1>Tasks</h1>
      <div id="task-container">
        <canvas id="task-chart"></canvas>
      </div>
      <div id="task-details">
        <ul></ul>
      </div>
    </div>

    <div id="clocks">
      <h3>Clock</h3>
      <div id="clock-container">
        <h1 id="clock">
          00:24:12
        </h1>
      </div>
    </div>

    <div id="graphs">
      <h2>Graphs</h2>
      <div id="graph-container">
        <canvas id="graph-chart"></canvas>
      </div>
    </div>
  </div>
`;
