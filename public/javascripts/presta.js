import data from "./dataPresta.js";

function changeChevrons() {
  let icons = document.querySelectorAll(".fas");
  let windowWidth = window.innerWidth;
  let chevronType;
  windowWidth >= "850" ? (chevronType = "right") : (chevronType = "down");
  icons.forEach((icon) => {
    if (icon.classList.contains("fa-chevron-right"))
      icon.classList.remove("fa-chevron-right");
    if (icon.classList.contains("fa-chevron-down"))
      icon.classList.remove("fa-chevron-down");
    icon.classList.add(`fa-chevron-${chevronType}`);
  });
}

function displayData() {
  let buttons = document.querySelectorAll(".presta-item");
  let finalLocation = cleanLocation();
  if (finalLocation === "details") {
    document.querySelectorAll(".presta-item").forEach((button) => {
      button.classList.contains("selected-item") &&
        button.classList.remove("selected-item");
    });
    let firstButton = document.querySelector(".presta-item");
    firstButton.classList.add("selected-item");
    let selectedCategory = data.filter(
      (setOfData) => setOfData.category === firstButton.dataset.cat
    );
    let finalData = selectedCategory[0].options;
    let additionalData = selectedCategory[0].addOn
      ? selectedCategory[0].addOn
      : null;

    createGridFromData(finalData, additionalData);
  }
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
    createOneCard(oneArticle, index, resultDiv);
  });
  if (window.innerWidth < 500) {
    addAdditionalButton(resultDiv);
  }
  addAdditionalText(additionalData);
}

function createOneCard(oneArticle, index, resultDiv) {
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
    let additionalText = `<p class="content"> Pour plus de détails sur les sujets possibles, voir <a href="/transition#graph">ici</a>. </p>`;
    newArticle.innerHTML += additionalText;
  }
  let link =
    oneArticle.callToAction === "prendre rdv" ||
    oneArticle.callToAction === "let's meet"
      ? "https://calendly.com/frequence440"
      : "";
  newArticle.innerHTML += `<div class="semi-underlined">
  <a href="${link}" target="_blank">${oneArticle.callToAction}</a>
  </div>`;
  if (
    oneArticle.callToAction === "demander un devis" ||
    oneArticle.callToAction === "ask for invoice"
  ) {
    newArticle.querySelector(".semi-underlined a").onclick = () =>
      displayInvoice(oneArticle.title);
  }
  resultDiv.append(newArticle);
}

function addAdditionalButton(resultDiv) {
  let navigationDiv = document.createElement("a");
  navigationDiv.className = "button black-button flex";
  navigationDiv.setAttribute("href", "#details");
  navigationDiv.innerHTML =
    '<i class="fa fa-chevron-up" aria-hidden="true"></i><p>Voir les autres prestations</p>';
  resultDiv.append(navigationDiv);
}

function addAdditionalText(additionalData) {
  let additionalContainer = document.querySelector(".additional-container");
  additionalContainer.innerHTML = "";
  additionalContainer.style.display = "none";
  if (additionalData) {
    additionalContainer.style.display = "block";
    let additionalInfo = document.createElement("div");
    additionalInfo.innerHTML = `
    <h3>${additionalData.title}</h3>
    <p class="content">${additionalData.content}</p>
    `;
    additionalContainer.append(additionalInfo);
  }
}

function displayInvoice(requestedService) {
  event.preventDefault();
  let invoiceContainer = document.createElement("div");
  invoiceContainer.innerHTML = `<div id="invoice">
  <div class="flex space-b">
    <h2>FORMULAIRE DE DEVIS</h2>
    <img src="/images/menu-close.svg" id="close-invoice"></img>
  </div>
  <div class="bordered flex-col flex-center">
    <p>Si vous voulez discuter avant, prenez RDV:</p>
    <a href="" class="button black-button">Voir le calendrier</a>
  </div>
  <div class="flex-col">
    <input type="hidden" id="requested-service" name="requestedService" value="${requestedService}">
    <div class="form-group flex-col">
      <label for="client-name">Nom*</label>
      <input type="text" name="name" id="client-name" required />
    </div>
    <div class="form-group flex-col">
      <label for="client-email">Email de contact*</label>
      <input type="text" name="email" id="client-email" required />
    </div>
    <div class="form-group flex-col">
      <label for="client-number">Numéro de téléphone</label>
      <input type="text" name="number" id="client-number" />
    </div>
    <div class="form-group flex-col">
      <label for="client-type">Nom de l'Entreprise ou Ecole du supérieur*</label>
      <input type="text" name="type" id="client-type" required/>
    </div>
    <div class="form-group flex-col">
      <label for="client-quantity"
        >Nombre de personnes*</label
      >
      <input type="number" name="quantity" id="client-quantity" required />
    </div>
    <div class="form-group flex-col">
      <label for="client-message"
        >Message (merci de préciser les équipes qui seront concernées, les
        contraintes de temps / espace / matériel, etc.)</label
      >
      <textarea
        name="message"
        id="client-message"
        cols="30"
        rows="3"
      ></textarea>
    </div>
    <div class="form-group flex-col">
      <label for="client-hours">Horaire</label>
      <input type="text" name="hours" id="client-hours" />
    </div>
    <div class="flex align-c">
      <button id="send-invoice" class="button black-button" type="submit">Envoyer</button>
      <div id="additional-message"></div>
    </div>
  </div>
</div>`;
  invoiceContainer.className = "invoice-container";
  invoiceContainer.style.minHeight = "100vh";
  document.querySelector("body").append(invoiceContainer);
  invoiceContainer.querySelector("#close-invoice").onclick = removeInvoice;
  invoiceContainer.querySelector("#send-invoice").onclick = sendInvoice;
}

function removeInvoice() {
  document.querySelector(".invoice-container").remove();
}

function sendInvoice() {
  let invoiceToSend = {
    requestedService: document.querySelector('input[name="requestedService"]')
      .value,
    email: document.querySelector('input[name="email"]').value,
    name: document.querySelector('input[name="name"]').value,
    type: document.querySelector('input[name="type"]').value,
    number: document.querySelector('input[name="number"]').value,
    quantity: document.querySelector('input[name="quantity"]').value,
    message: document.querySelector('textarea[name="message"]').value,
    hours: document.querySelector('input[name="hours"]').value,
  };

  let additionalMessage = document.querySelector("#additional-message");
  if (
    invoiceToSend.email === "" ||
    invoiceToSend.name === "" ||
    invoiceToSend.type === "" ||
    invoiceToSend.number === ""
  ) {
    additionalMessage.innerHTML = `<p>Veuillez renseigner tous les champs obligatoires</p>`;
    return;
  }
  axios
    .post("/send-email", invoiceToSend)
    .then((success) => {
      console.log("success:", success.data[0]);
      additionalMessage.innerHTML = `<p>${success.data[0]}</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
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

function createContainingDivs() {
  // cards grid
  let resultDiv = document.createElement("div");
  resultDiv.setAttribute("id", "cards");
  // additional data container
  let additionalDiv = document.createElement("div");
  additionalDiv.setAttribute("class", "additional-container");

  let siblingDivCards = document.querySelector(".presta-list").parentNode;
  siblingDivCards.parentNode.insertBefore(
    resultDiv,
    siblingDivCards.nextSibling
  );

  let siblingDivAdditional = document.querySelector(".presta-list");
  siblingDivAdditional.parentNode.insertBefore(
    additionalDiv,
    siblingDivAdditional.nextSibling
  );
}

// call the functions the first time to display data on screen
createContainingDivs();
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
window.addEventListener("DOMContentLoaded", () => {
  changeChevrons();
  getGridData();
});
window.addEventListener("resize", () => {
  changeChevrons();
  getGridData();
});
