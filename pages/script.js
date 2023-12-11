// Sidebar CSS manipulation
const sidebar = document.getElementById("sidebar");
const chevron = document.getElementById("chevron");
const main = document.querySelector("main");

chevron.addEventListener("click", mobileMenu);

function mobileMenu() {
  sidebar.classList.toggle("active");
  chevron.classList.toggle("active");
  main.classList.toggle("active");
}
