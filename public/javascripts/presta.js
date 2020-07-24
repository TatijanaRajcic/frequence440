import data from "./dataPresta.js";

console.log("presta script executed");

function displayData() {
  let buttons = document.querySelectorAll(".presta-item");
  let finalLocation = cleanLocation();
  buttons.forEach((button) => {
    if (button.dataset.cat === finalLocation) {
      document.querySelectorAll(".presta-item").forEach((button) => {
        button.classList.contains("selected-item") &&
          button.classList.remove("selected-item");
      });
      button.classList.add("selected-item");

      let selectedCategory = data.filter(
        (setOfData) => setOfData.category === button.dataset.cat
      );
      let finalData = selectedCategory[0].options;
      let additionalData = selectedCategory[0].addOn
        ? selectedCategory[0].addOn
        : null;
      createGridFromData(finalData, additionalData);
    }
  });
}

function cleanLocation() {
  let checkFrEn = document.querySelector(".hero-title").innerHTML;
  let cutHash = window.location.hash.split("#")[1];
  let finalLocation = cutHash;
  if (finalLocation === undefined && checkFrEn === "Prestations")
    finalLocation = "diagnostics";
  if (finalLocation === undefined && checkFrEn === "Services")
    finalLocation = "analysis";
  if (finalLocation === "conf%C3%A9rences") finalLocation = "conférences";
  return finalLocation;
}

function createGridFromData(data, additionalData) {
  let resultDiv = document.getElementById("cards");
  resultDiv.innerHTML = "";
  data.forEach((oneArticle, index) => {
    let newArticle = document.createElement("div");
    newArticle.classList.add("card");
    newArticle.classList.add("flex-col");
    newArticle.classList.add("space-b");
    let duration = oneArticle.duration;
    if (!duration) duration = "";
    newArticle.innerHTML = `
    <div>
      <div class="detailed-info flex space-b">
        <p class="index">0${index + 1}</p>
        <p class="duration">${duration}</p>
      </div>
      <h3>${oneArticle.title}</h3>
      <p class="content">${oneArticle.content}</p>
    </div>
    `;
    if (oneArticle.title === "Ateliers solutions") {
      let additionalText = `<p class="content"> Pour plus de détails sur les sujets possibles, voir <a href="/transition">ici</a>. </p>`;
      newArticle.innerHTML += additionalText;
    }
    newArticle.innerHTML += `<div class="semi-underlined">
    <a href="/prestations">${oneArticle.callToAction}</a>
    </div>`;
    resultDiv.append(newArticle);
  });
  let additionalContainer = document.querySelector(".additional-container");
  additionalContainer.innerHTML = "";
  additionalContainer.style.visibility = "hidden";
  if (additionalData) {
    additionalContainer.style.visibility = "visible";
    let additionalInfo = document.createElement("div");
    additionalInfo.innerHTML = `
    <h3>${additionalData.title}</h3>
    <p class="content">${additionalData.content}</p>
    `;
    additionalContainer.append(additionalInfo);
  }
}

function scrollToGrid() {
  const y =
    document.getElementById("details").getBoundingClientRect().top +
    window.scrollY -
    document.getElementById("navbar-sticky").getBoundingClientRect().height;

  // TO FIX: pbm when you go from the homepage and you click on a footer link because then there is a issue with the scroll (from top to bottom, so the nav is hidden whereas it shouldn't be here)
  window.scroll({
    top: y,
    behavior: "smooth",
  });
}

function getGridData() {
  let nbrCards = document.getElementsByClassName("card").length;
  // calc computed style
  const gridComputedStyle = window.getComputedStyle(
    document.getElementById("cards")
  );
  let gridColumnCount = gridComputedStyle
    .getPropertyValue("grid-template-columns")
    .split(" ").length;

  let lastCard = document.getElementsByClassName("card")[nbrCards - 1];

  if (nbrCards % gridColumnCount === 1) {
    lastCard.classList.add("expand");
  } else {
    lastCard.classList.remove("expand");
  }
}

// call the functions the first time to display data on screen
displayData();
getGridData();
if (window.location.hash != "") scrollToGrid();

// listen for selected list item (on the left side of the screen)
document.querySelectorAll(".presta-item").forEach((button) => {
  button.onclick = () => {
    window.history.pushState(
      `${button.dataset.cat}`,
      `${button.dataset.cat}`,
      `#${button.dataset.cat}`
    );
    displayData();
    getGridData();
  };
});

// listen for clickable link (on the bottom of the screen)
let footerLinks = document.querySelectorAll(".sub-link");
footerLinks.forEach((link) => {
  link.onclick = () => {
    console.log(window.location);

    window.history.pushState(
      `${link.dataset.cat}`,
      `${link.dataset.cat}`,
      `#${link.dataset.cat}`
    );
    displayData();
    getGridData();
    scrollToGrid();
  };
});

// listen for changes in display
window.addEventListener("DOMContentLoaded", getGridData);
window.addEventListener("resize", getGridData);
