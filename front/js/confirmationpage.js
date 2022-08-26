
let confirmationId = window.location.search;

console.log(window.location);

let params = new URLSearchParams(confirmationId);

let orderId = params.get("id");

console.log(orderId);

const showConfirmationId  = document.getElementById("orderId");

showConfirmationId.innerText = orderId;

//This clears the id from the local storage, ready for a new order post to come through
localStorage.clear();