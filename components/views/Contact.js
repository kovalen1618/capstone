import html from "html-literal";

export default () => html`
  <!-- Formspree library CDN -->
  <form
    class="form-wrapper"
    action="https://formspree.io/f/xvojeqev"
    method="POST"
  >
    <header>
      <h1>Send Me a Message!</h1>
      <h5>contact form powered by Formspree</h5>
    </header>
    <div class="input-bar">
      <input
        class="form-input"
        type="text"
        name="name"
        autocomplete="off"
        required
      />
      <label class="form-label" htmlFor="name">Full Name</label>
    </div>
    <div class="input-bar">
      <input
        class="form-input"
        type="email"
        name="email"
        autocomplete="off"
        required
      />
      <label class="form-label" htmlFor="email">Email</label>
    </div>
    <div class="input-bar">
      <textarea
        class="form-textarea"
        cols="40"
        rows="6"
        name="message"
        placeholder="Type your message here..."
        autocomplete="off"
        required
      ></textarea>
      <label class="form-label" htmlFor="message">Notes</label>
    </div>

    <button class="form-button" type="submit">Send Message</button>
  </form>
`;
