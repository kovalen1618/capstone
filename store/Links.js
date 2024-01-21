import logoImage from "../documents/img/logo.png";

export default [
  {
    title: "Home",
    text: "",
    style: "",
    icon: `<header id="header">
      <img id="logo" src="${logoImage}" alt="Priora Logo" />
    </header>`
  },
  {
    title: "Create",
    text: `<span class="menu-text">Create Task</span>`,
    style: "menu-link",
    icon: `<i class="fa-solid fa-circle-plus"></i>`
  },
  // {
  //   title: "Badges",
  //   text: `<span class="menu-text">Badges</span>`,
  //   style: "menu-link",
  //   icon: `<i class="fa-solid fa-award"></i>`
  // },
  {
    title: "About",
    text: `<span class="menu-text">About</span>`,
    style: "menu-link",
    icon: `<i class="fa-solid fa-scroll"></i>`
  },
  {
    title: "Contact",
    text: `<span class="menu-text">Contact</span>`,
    style: "menu-link",
    icon: `<i class="fa-solid fa-envelope"></i>`
  },
  {
    title: "Settings",
    text: `<span class="menu-text">Settings</span>`,
    style: "menu-link",
    icon: `<i class="fa-solid fa-gear"></i>`
  }
];
