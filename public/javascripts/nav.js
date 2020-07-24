let previousPosition = 0;
let navbar = document.getElementById("navbar-sticky");
let menuIcon = document.querySelector(".js-hamburger");
let header = document.querySelector(".header-intro");

window.onscroll = function () {
  let bottomOfNavbarScroll = window.scrollY + navbar.clientHeight;
  let begginingOfInvisibility = header.clientHeight + navbar.clientHeight;
  if (
    bottomOfNavbarScroll > begginingOfInvisibility &&
    !menuIcon.classList.contains("is-active")
  ) {
    toggleVisibility();
  }
};

function toggleVisibility() {
  if (window.scrollY > previousPosition) {
    navbar.style.visibility = "hidden";
  } else {
    navbar.style.visibility = "visible";
  }
  previousPosition = window.scrollY;
}

function addNavListeners() {
  if (menuIcon.classList.contains("is-active")) {
    menuIcon.onclick = closeNav;
  } else {
    menuIcon.onclick = openNav;
  }
}

function openNav() {
  document.getElementById("navbar-fullscreen").style.height = "90vh";
  menuIcon.classList.add("is-active");
  addNavListeners();
  addActiveLink();
}

function closeNav() {
  menuIcon.classList.remove("is-active");
  addNavListeners();
  document.getElementById("navbar-fullscreen").style.height = "0vh";
}

function addActiveLink() {
  let fullscreenNav = document.getElementById("navbar-fullscreen");
  let currentPage = fullscreenNav.dataset.page;
  fullscreenNav
    .querySelector("ul")
    .querySelectorAll("li")
    .forEach((link) => {
      link.onclick = () => {
        //console.log("going to another page");
      };
      if (link.classList.contains("active-link"))
        link.classList.remove("active-link");
      if (link.dataset.link === currentPage) {
        link.classList.add("active-link");
      }
    });
}

addNavListeners();
