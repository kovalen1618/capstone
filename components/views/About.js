import html from "html-literal";
import yinYangImage from "../../documents/img/yinyang.jpg";

export default () => html`
  <div id="about-wrapper">
    <div id="about-banner">
      <h1>Setting Priorities</h1>
      <img
        src="${yinYangImage}"
        alt="Photo of Yin & Yang decor by Дмитрий Хрусталев-Григорьев on Unsplash"
      />
    </div>
    <div id="about-text-wrapper">
      <p>
        Life is chaotic, it is truly beyond anyone's full control and that's
        just a hard truth. When it's needed, it's good to embrace that chaos,
        but sometimes we let it get too close. We start skipping homework
        saying, "Oh my grades will be fine," or "I'll clean my room next week."
        Sometimes it can devolve into days of no productivity, wondering what
        you're doing or how to even get back to order.
      </p>
      <p>
        I, Ethan Kovalenko, the developer of Priora know that feeling of losing
        order all too well. This app was made for me to better myself and regain
        that structure I've been missing for so long. My plan is to have
        everyone who's struggling to get back onto the path be able to do it
        easily with the help of Priora.
      </p>
    </div>
  </div>
`;
