let contactButton = document.querySelector("#send-contact");
contactButton.onclick = sendContact;

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
];

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
    additionalMessage.innerHTML = `<p>Veuillez renseigner tous les champs obligatoires</p>`;
    return;
  }
  axios
    .post("/send-contact", contactToSend)
    .then((success) => {
      console.log("success:", success.data[0]);
      additionalMessage.innerHTML = `<p>${success.data[0]}</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendInvoice() {
  let invoice = document.querySelector("#invoice-form");
  let notComplete = false;
  invoice.querySelectorAll(".mandatory").forEach((mandatory) => {
    if (mandatory.closest(".form-group").lastElementChild.value === "") {
      let additionalMessage = document.querySelector(
        "#invoice-form .additional"
      );
      additionalMessage.innerHTML = "You must complete everything";
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
      quantity: oneService.querySelector('input[name="quantity"]').value,
      message: oneService.querySelector('textarea[name="message"]').value,
    };
    invoiceToSend.services.push(serviceDetails);
  });

  console.log(invoiceToSend);

  axios
    .post("/send-complete-invoice", invoiceToSend)
    .then((success) => {
      console.log("success:", success.data[0]);
      additionalMessage.innerHTML = `<p>${success.data[0]}</p>`;
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
    <input type="number" name="quantity" id="client-quantity-${index}" required />
  </div>
  <div class="form-group flex-col">
    <label for="client-message-${index}">Message (merci de préciser les équipes qui seront concernées, les
      contraintes de temps / espace / matériel, etc.)</label>
    <textarea name="message" id="client-message-${index}" cols="30" rows="6"></textarea>
  </div>`;
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

document.getElementById("add").onclick = addNewService;
document.querySelector(".close-invoice").onclick = removeService;
document.querySelector(".select-presta-type").onchange = (e) => {
  fillPrestaList(e);
};
document.getElementById("send-invoice").onclick = sendInvoice;
