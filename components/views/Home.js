import html from "html-literal";

export default () => html`
  <div id="home-wrapper">
    <div id="tasks">
      <h3>Tasks</h3>
      <div id="task-container">
        <canvas id="task-chart"></canvas>
      </div>
      <div id="task-view">
        <div id="task-details">
          <!-- Populated info goes here -->
        </div>
        <div id="task-options">
          <i id="edit-button" class="fa-solid fa-pencil"></i>
          <i id="delete-button" class="fa-solid fa-x"></i>
        </div>
      </div>
    </div>

    <div id="clocks">
      <h3>Timer</h3>
      <div id="clock-container">
        <!-- <button id="play"></button> -->
        <h1 id="clock">
          <span id="hours-10">0</span>
          <span id="hours-1">0</span>
          :
          <span id="minutes-10">0</span>
          <span id="minutes-1">0</span>
          :
          <span id="seconds-10">0</span>
          <span id="seconds-1">0</span>
        </h1>
      </div>
    </div>

    <div id="graphs">
      <h3>Jan 1st - Jan 7th</h3>
      <div id="graph-container">
        <canvas id="graph-chart"></canvas>
      </div>
    </div>
  </div>
`;
