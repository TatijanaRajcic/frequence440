let previousScroll = 30;
let navbar = document.getElementById("navbar");

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
  let myColoredElements = document.querySelectorAll(".main-color");
  // console.log(myColoredElements);
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
