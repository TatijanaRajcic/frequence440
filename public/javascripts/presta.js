import data from "./dataPresta.js";

function displayData() {
  let resultDiv = document.getElementById("presta-result");
  resultDiv.innerHTML = "";
  var buttons = document.querySelectorAll(".presta-item");
  buttons.forEach((button) => {
    if (button.classList.contains("selected-item")) {
      let selectedCategory = data.filter(
        (setOfData) => setOfData.category === button.dataset.cat
      );
      let finalData = selectedCategory[0].options;
      finalData.forEach((oneArticle, index) => {
        let newArticle = document.createElement("div");
        newArticle.classList.add("card");
        newArticle.innerHTML = `
        <p class="index">${index + 1}</p>
        <h3>${oneArticle.title}</h3>
        <p class="content">${oneArticle.content}</p>
        `;
        resultDiv.append(newArticle);
      });
    }
  });
}

displayData();

document.querySelectorAll(".presta-item").forEach((button) => {
  button.onclick = () => {
    document.querySelectorAll(".presta-item").forEach((button) => {
      button.classList.contains("selected-item") &&
        button.classList.remove("selected-item");
    });
    button.classList.add("selected-item");
    displayData();
    getGridData();
  };
});

function getGridData() {
  let nbrCards = document.getElementsByClassName("card").length;
  // calc computed style
  const gridComputedStyle = window.getComputedStyle(
    document.getElementById("presta-result")
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

  // si égal à 1 alors on agrandit la taille de la dernière section
}

window.addEventListener("DOMContentLoaded", getGridData);
window.addEventListener("resize", getGridData);

getGridData();
