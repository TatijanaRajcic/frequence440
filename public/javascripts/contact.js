let contactButton = document.querySelector("#send-contact");
contactButton.onclick = sendContact;

let prestaDetails = [
  { presta: "diagnostics", details: ["Diagnostics1", "Diagnostics2"] },
  { presta: "ateliers", details: ["ATELIER1", "ATELIER2"] },
  { presta: "conférences", details: ["conf1", "conf2"] },
  { presta: "formations", details: ["form1", "form2"] },
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
    .post("/send-contact", invoiceToSend)
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
    <label for="presta-type-${index}">Type (diagnostic, atelier, conférence, formation)</label>
    <select class="select-presta-type" name="presta-${index}" id="presta-type-${index}">
      <option value=""></option>
      <option value="diagnostics">Diagnostics</option>
      <option value="ateliers">Ateliers</option>
      <option value="conférences">Conférences</option>
      <option value="formations">Formations</option>
    </select>
  </div>
  <div class="form-group flex-col">
    <label for="details-presta-${index}">Nom de la prestation</label>
    <select class="select-presta-details" name="details-${index}" id="details-presta-${index}">
      <option value=""></option>
    </select>
  </div>
  <div class="form-group flex-col">
    <label for="client-quantity-${index}">Nombre de personnes<span class="mandatory">*</span></label>
    <input type="number" name="quantity-${index}" id="client-quantity-${index}" required />
  </div>
  <div class="form-group flex-col">
    <label for="client-message-${index}">Message (merci de préciser les équipes qui seront concernées, les
      contraintes de temps / espace / matériel, etc.)</label>
    <textarea name="message-${index}" id="client-message-${index}" cols="30" rows="6"></textarea>
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
  listToFill.innerHTML = "";
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
