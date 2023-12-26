import html from "html-literal";

export default () => html`
  <form id="create-form">
    <!-- <header>
      <h1>Create a Task</h1>
    </header> -->
    <!-- Labels use htmlFor instead of for because this is JSX, not HTML -->
    <!-- ids in inputs must match the htmlFor in their corresponding labels -->
    <div class="input-bar">
      <input
        class="form-input"
        type="text"
        name="task-title"
        id="task-title"
        placeholder="Name of your task..."
      />
      <label class="form-label" htmlFor="task-title">Title</label>
    </div>

    <!-- Used for giving certain attributes to certain tasks such as exercise sets, sleep health, etc. -->
    <div class="input-bar">
      <select class="form-input" name="task-type" id="task-type">
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Sleep">Sleep</option>
        <option value="Exercise">Exercise</option>
      </select>
      <label class="form-label" htmlFor="task-type">Type (Optional)</label>
    </div>

    <div class="input-bar">
      <input class="form-input" type="time" name="task-time" id="task-time" />
      <label class="form-label" htmlFor="task-time">Time</label>
    </div>

    <div class="input-bar">
      <textarea
        class="form-textarea"
        cols="40"
        rows="6"
        name="task-notes"
        id="task-notes"
        placeholder="Important items for your task..."
      ></textarea>
      <label class="form-label" htmlFor="task-notes">Notes</label>
    </div>

    <button type="submit">Create Task</button>
  </form>
`;
