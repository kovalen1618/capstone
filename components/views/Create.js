import html from "html-literal";

function generateRandomHexCode() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

  let hexCode = "#";

  while (hexCode.length < 7) {
    hexCode += digits[Math.round(Math.random() * digits.length)];
  }

  return hexCode;
}

export default state => html`
  <form class="form-wrapper" id="create-form" method="POST">
    <header>
      <h1>Create a Task</h1>
    </header>
    <!-- Labels use htmlFor instead of for because this is JSX, not HTML -->
    <!-- ids in inputs must match the htmlFor in their corresponding labels -->
    <div class="input-bar">
      <input
        class="form-input"
        type="text"
        name="title"
        id="task-title"
        placeholder="Name of your task..."
        required
      />
      <label class="form-label" htmlFor="title">Title</label>
    </div>

    <div class="type-wrapper">
      <!-- Used for giving certain attributes to certain tasks such as exercise sets, sleep health, etc. -->
      <div class="input-bar">
        <select class="form-input" name="type" id="type-input" required>
          <option id="empty-option" disabled selected value> </option>
          <option value="Exercise">Exercise</option>
          <option value="Other">Other</option>
          <option value="Sleep">Sleep</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
        </select>
        <label class="form-label" htmlFor="type">Type</label>
      </div>
      <!-- Populate with exercise data -->
      <div class="input-bar" id="exercise-input">
        <select class="form-input" name="exercise">
          <option id="empty-option" disabled selected value> </option>
          <!-- Return all exercise results as options -->
          ${state.exercises.results.map(result => {
  return `<option value="${result.name}">${result.name}</option>`;
})}
        </select>
        <label class="form-label" htmlFor="exercise">Exercise</label>
      </div>
    </div>

    <div class="type-wrapper">
      <!-- TODO: Create responsive time input like that of many Phone applications -->
      <div class="input-bar">
        <input
          class="form-input"
          type="number"
          name="time"
          id="task-time"
          required
        />
        <label class="form-label" htmlFor="time">Time (Minutes)</label>
      </div>

      <div class="input-bar" id="color-input">
        <input
          class="form-input"
          type="color"
          name="color"
          value=${generateRandomHexCode()}
          id="task-color"
        />
        <label class="form-label" htmlFor="color">Color</label>
      </div>
    </div>

    <div class="input-bar">
      <textarea
        class="form-textarea"
        cols="40"
        rows="6"
        name="notes"
        placeholder="Important items for your task..."
      ></textarea>
      <label class="form-label" htmlFor="notes">Notes (Optional)</label>
    </div>

    <button class="form-button" type="submit">Create Task</button>
  </form>
`;
