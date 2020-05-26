let previousPosition = 0;
let navbar = document.getElementById("navbar");
let menuIcon = document.querySelector(".js-hamburger");

window.onscroll = function () {
  if (window.scrollY > window.innerHeight) {
    toggleVisibility();
  }
  // toggleColor();
};

function toggleVisibility() {
  console.log("position", window.scrollY);
  console.log("prev", previousPosition);

  if (window.scrollY > previousPosition) {
    navbar.style.visibility = "hidden";
    console.log("hide hide hide");
  } else {
    navbar.style.visibility = "visible";
  }
  previousPosition = window.scrollY;
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
  if (menuIcon.classList.contains("is-active")) {
    menuIcon.onclick = closeNav;
  } else {
    menuIcon.onclick = openNav;
  }
}

function openNav() {
  document.getElementById("myNav").style.height = "90vh";
  menuIcon.classList.add("is-active");
  addNavListeners();
  addActiveLink();
}

function closeNav() {
  menuIcon.classList.remove("is-active");
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
