var slideIndex = 0;
var slides = document.getElementsByClassName("slides");
var dots = document.getElementsByClassName("dot");

function hideSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
}

function inactivateDots() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
}

function showSlide() {
  slides[slideIndex].style.display = "flex";
}

function showDot() {
  dots[slideIndex].className += " active";
}

function showSlideshow() {
  hideSlides();
  inactivateDots();
  showSlide();
  showDot();
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  setTimeout(showSlideshow, 7000); // Change image every 2 seconds
}

for (let i = 0; i < dots.length; i++) {
  dots[i].onclick = (e) => {
    console.log(e.currentTarget);
    let currentDot = e.currentTarget;
    slideIndex = Number(currentDot.dataset.index);
    hideSlides();
    inactivateDots();
    showSlide();
    showDot();
  };
}

function clickableSections() {
  let rightTop = document.querySelector(".right-top");
  rightTop.onclick = () => {
    window.location.assign("/prestations");
  };
  let rightBottom = document.querySelector(".right-bottom");
  rightBottom.onclick = () => {
    window.location.assign("/ressources");
  };
}

showSlideshow(slideIndex);
clickableSections();
