let contactButton = document.querySelector("#send-contact");
contactButton.onclick = sendContact;

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
