import html from "html-literal";

export default () => html`
  <!-- Formspree library CDN -->
  <form
    action="https://formspree.io/f/xvojeqev"
    method="POST"
    id="contact-form"
  >
    <header>
      <h1>Send Me a Message!</h1>
      <h5>contact form powered by Formspree</h5>
    </header>
    <input
      type="text"
      name="name"
      placeholder="Full Name"
      autocomplete="off"
      required
    />
    <input
      type="email"
      name="email"
      placeholder="Email Address"
      autocomplete="off"
      required
    />
    <textarea
      rows="6"
      cols="40"
      name="message"
      placeholder="Type your message here..."
      autocomplete="off"
      required
    ></textarea>
    <button type="submit">Send Message</button>
  </form>
`;
