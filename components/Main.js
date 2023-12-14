import html from "html-literal";
import * as views from "./views";

export default state => html`
  <main>${views[state.view](state)}</main>
`;
