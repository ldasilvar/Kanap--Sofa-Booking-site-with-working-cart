
let confirmationId = window.location.search;

let params = new URLSearchParams(confirmationId);

let orderId = params.get("id");

const showConfirmationId  = document.getElementById("orderId");

showConfirmationId.innerText = orderId;

//This clears all the items and the id from the local storage, ready for a new order post to come through
localStorage.clear();