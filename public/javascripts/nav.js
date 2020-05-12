let previousScroll = 30;

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (window.scrollY > previousScroll) {
    document.getElementById("navbar").style.visibility = "hidden";
  } else {
    document.getElementById("navbar").style.visibility = "visible";
  }
  previousScroll = window.scrollY;
}
