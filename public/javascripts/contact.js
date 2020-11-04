let prestaDetails = [
  {
    presta: "diagnostics",
    details: ["Bilan carbone ®", "Diagnostic RSE", "Questionnaire équipes"],
  },
  { presta: "ateliers", details: ["Ateliers solutions", "Collective impact"] },
  {
    presta: "conférences",
    details: [
      "Les trois courbes",
      "Les trois courbes - Ingénieurs",
      "Elle est jolie ta robe aujourd’hui !",
      "Conférence personnalisée",
    ],
  },
  {
    presta: "formations",
    details: [
      "Fresque du Climat",
      "Atelier 2 Tonnes",
      "Renaissance Ecologique",
      "Fresque Biodiversité",
      "Fresque Océane",
      "Fresque du Numérique",
    ],
  },
  {
    presta: "analysis",
    details: [
      "Carbon Footprint ®",
      "Social Responsibility analysis",
      "Teams surveys",
    ],
  },
  {
    presta: "trainings",
    details: [
      "Climate Collage",
      "2 tons",
      "Ecological Renaissance",
      "Biodiversity Collage",
      "Oceans Collage",
      "Digital World Collage",
    ],
  },
  {
    presta: "conferences",
    details: [
      "The three graphs",
      "The three graphs for engineers",
      "Your dress looks nice today",
    ],
  },
  {
    presta: "workshops",
    details: ["Solutions workshops", "Collective Impact action"],
  },
];

let checkFrEn = document.querySelector(".catchphrase").innerHTML;

function sendContact() {
  let contactToSend = {
    email: document.querySelector('input[name="email"]').value,
    name: document.querySelector('input[name="name"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  let additionalMessage = document.querySelector("#contact-form .additional");
  if (
    contactToSend.email === "" ||
    contactToSend.name === "" ||
    contactToSend.message === ""
  ) {
    additionalMessage.innerHTML =
      checkFrEn === "Je suis à votre écoute"
        ? "<p>Veuillez renseigner tous les champs obligatoires</p>"
        : "Please enter every mandatory field";
    return;
  }
  axios
    .post("/send-contact", contactToSend)
    .then((success) => {
      additionalMessage.innerHTML =
        checkFrEn === "Je suis à votre écoute"
          ? `<p>${success.data.fr}</p>`
          : `<p>${success.data.en}</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendInvoice() {
  let invoice = document.querySelector("#invoice-form");
  let additionalMessage = document.querySelector("#invoice-form .additional");
  let notComplete = false;
  invoice.querySelectorAll(".mandatory").forEach((mandatory) => {
    if (mandatory.closest(".form-group").lastElementChild.value === "") {
      additionalMessage.innerHTML =
        checkFrEn === "Je suis à votre écoute"
          ? "<p>Veuillez renseigner tous les champs obligatoires</p>"
          : "Please enter every mandatory field";
      notComplete = true;
    }
  });
  if (notComplete) return;

  let invoiceToSend = {
    email: invoice.querySelector('input[name="email"]').value,
    name: invoice.querySelector('input[name="name"]').value,
    number: invoice.querySelector('input[name="number"]').value,
    clientType: invoice.querySelector('input[name="client-type"]').value,
    address: invoice.querySelector('input[name="address"]').value,
    services: [],
  };

  document.querySelectorAll(".service").forEach((oneService) => {
    let serviceDetails = {
      type: oneService.querySelector('select[name="service-type"]').value,
      name: oneService.querySelector('select[name="service-name"]').value,
      quantity: oneService.querySelector('select[name="quantity"]').value,
      message: oneService.querySelector('textarea[name="message"]').value,
    };
    invoiceToSend.services.push(serviceDetails);
  });

  axios
    .post("/send-complete-invoice", invoiceToSend)
    .then((success) => {
      additionalMessage.innerHTML =
        checkFrEn === "Je suis à votre écoute"
          ? `<p>${success.data.fr}</p>`
          : `<p>${success.data.en}</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function addNewService() {
  let alreadyExistingServices = document.querySelectorAll(".service").length;
  let index = alreadyExistingServices + 1;
  let newService = document.createElement("div");
  newService.setAttribute("class", "service bordered");
  if (checkFrEn === "Je suis à votre écoute") {
    newService.innerHTML = ` 
    <div class="index-container flex space-b">
      <p class="index">0${index}</p>
      <img src="/images/menu-close-white.svg" class="close-invoice"></img>
    </div>
    <div class="form-group flex-col">
      <label for="presta-type-${index}">Type (diagnostic, atelier, conférence, formation)<span class="mandatory">*</span></label>
      <select class="select-presta-type" name="service-type" id="presta-type-${index}">
        <option value=""></option>
        <option value="diagnostics">Diagnostics</option>
        <option value="ateliers">Ateliers</option>
        <option value="conférences">Conférences</option>
        <option value="formations">Formations</option>
      </select>
    </div>
    <div class="form-group flex-col">
      <label for="details-presta-${index}">Nom de la prestation<span class="mandatory">*</span></label>
      <select class="select-presta-details" name="service-name" id="details-presta-${index}">
        <option value=""></option>
      </select>
    </div>
    <div class="form-group flex-col">
      <label for="client-quantity-${index}">Nombre de personnes<span class="mandatory">*</span></label>
      <textarea name="message" id="client-quantity-${index}" cols="30" rows="6"></textarea>
    </div>
    <div class="form-group flex-col">
      <label for="client-message-${index}">Message (merci de préciser les équipes qui seront concernées, les
        contraintes de temps / espace / matériel, etc.)</label>
      <textarea name="message" id="client-message-${index}" cols="30" rows="6"></textarea>
    </div>`;
  } else {
    newService.innerHTML = ` 
    <div class="index-container flex space-b">
      <p class="index">0${index}</p>
      <img src="/images/menu-close-white.svg" class="close-invoice"></img>
    </div>
    <div class="form-group flex-col">
      <label for="presta-type-${index}">Type (analysis, training, conference, solutions workshop)<span class="mandatory">*</span></label>
      <select class="select-presta-type" name="service-type" id="presta-type-${index}">
        <option value=""></option>
        <option value="analysis">Analysis</option>
        <option value="workshops">Workshops</option>
        <option value="conferences">Conferences</option>
        <option value="trainings">Trainings</option>
      </select>
    </div>
    <div class="form-group flex-col">
      <label for="details-presta-${index}">Service<span class="mandatory">*</span></label>
      <select class="select-presta-details" name="service-name" id="details-presta-${index}">
        <option value=""></option>
      </select>
    </div>
    <div class="form-group flex-col">
      <label for="client-quantity-${index}">Number of participants<span class="mandatory">*</span></label>
      <textarea name="message" id="client-quantity-${index}" cols="30" rows="6"></textarea>
    </div>
    <div class="form-group flex-col">
      <label for="client-message-${index}">Message (please mention your needs, field of interest, which teams will be involved, your time or space constraints, schedule, budget, etc.)</label>
      <textarea name="message" id="client-message-${index}" cols="30" rows="6"></textarea>
    </div>`;
  }

  newService.querySelector(".close-invoice").onclick = removeService;
  newService.querySelector(".select-presta-type").onchange = (e) => {
    fillPrestaList(e);
  };
  document.getElementById("services").appendChild(newService);
}

function removeService(e) {
  e.target.closest(".service").remove();
  updateIndexes();
}

function updateIndexes() {
  document.querySelectorAll(".service").forEach((oneService, index) => {
    oneService.querySelector(".index").innerHTML = `0${index + 1}`;
  });
}

function fillPrestaList(e) {
  let selectedType = e.target.options[e.target.selectedIndex].value;
  let listToFill = e.target
    .closest(".service")
    .querySelector(".select-presta-details");
  listToFill.innerHTML = `<option value=""></option>`;
  let options = prestaDetails.find((element) => element.presta === selectedType)
    .details;
  options.forEach((oneOption) => {
    let newOption = document.createElement("option");
    newOption.value = oneOption;
    newOption.innerHTML = oneOption;
    listToFill.appendChild(newOption);
  });
}

// Event listeners

document.getElementById("add").onclick = addNewService;
document.querySelector(".close-invoice").onclick = removeService;
document.querySelector(".select-presta-type").onchange = (e) => {
  fillPrestaList(e);
};
document.getElementById("send-contact").onclick = sendContact;
document.getElementById("send-invoice").onclick = sendInvoice;
