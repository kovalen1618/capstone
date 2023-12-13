import html from "html-literal";
import * as views from "./views";

export default () => html`
  <main>${views.Home()}</main>
  <main>${views.Contact()}</main>
`;
