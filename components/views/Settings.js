import html from "html-literal";

export default () => html`
  <div id="settings-wrapper">
    <form class="form-wrapper" id="settings-form">
      <header>
        <h1>Settings</h1>
      </header>
      <!-- <div class="input-bar">
        <select name="font" id="font-select" class="form-input">
          <option value="20px">20px</option>
        </select>
        <label for="font-select" class="form-label">Font Size</label>
      </div> -->
      <div class="input-bar">
        <input type="checkbox" id="theme-toggle" />
        <label for="theme-toggle" id="toggle-label"></label>
        <label for="theme-toggle" class="form-label">Theme</label>
      </div>
    </form>
  </div>
`;
