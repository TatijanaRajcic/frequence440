let previousScroll = 30;
let navbar = document.getElementById("navbar");
let menuIcon = document.getElementById("content-navbar").querySelector("i");

window.onscroll = function () {
  toggleVisibility();
  toggleColor();
};

function toggleVisibility() {
  if (window.scrollY > previousScroll) {
    navbar.style.visibility = "hidden";
  } else {
    navbar.style.visibility = "visible";
  }
  previousScroll = window.scrollY;
}

function toggleColor() {
  let myColoredElements = document.querySelectorAll(".main-section");
  myColoredElements.forEach((oneColoredElement) => {
    let currentBgColor = window.getComputedStyle(oneColoredElement)
      .backgroundColor;
    let start = oneColoredElement.offsetTop;
    let end = oneColoredElement.offsetTop + oneColoredElement.offsetHeight;
    if (window.scrollY > start && window.scrollY < end) {
      navbar.style.backgroundColor = currentBgColor;
    }
  });
}

function addNavListeners() {
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.onclick = openNav;
  } else {
    menuIcon.onclick = closeNav;
  }
}

function openNav() {
  document.getElementById("myNav").style.height = "90vh";
  menuIcon.classList.remove("fa-bars");
  menuIcon.classList.add("fa-times");
  addNavListeners();
  addActiveLink();
}

function closeNav() {
  menuIcon.classList.add("fa-bars");
  menuIcon.classList.remove("fa-times");
  addNavListeners();
  document.getElementById("myNav").style.height = "0vh";
}

addNavListeners();

function addActiveLink() {
  let fullscreenNav = document.getElementById("myNav");
  let currentPage = fullscreenNav.dataset.page;
  document
    .querySelector(".overlay-content")
    .querySelectorAll("li")
    .forEach((link) => {
      if (link.classList.contains("active-link"))
        link.classList.remove("active-link");
      if (link.dataset.link === currentPage) {
        link.classList.add("active-link");
      }
    });
}
