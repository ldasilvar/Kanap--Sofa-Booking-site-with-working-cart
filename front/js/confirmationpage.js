
let StringOrderId = window.location.search;

console.log(window.location);

let params = new URLSearchParams(StringOrderId);

let orderId = params.get("id");

console.log(orderId);

const displayOrderId  = document.getElementById("orderId");

displayOrderId.innerText = orderId;

localStorage.clear();