const params = new URLSearchParams(document.location.search); 
const id = params.get("_id");


const uri = 'http://localhost:3000/api/products'
let response;

// document.addEventListener("DOMContentLoaded", function(){
//     console.log('DOM loaded')
    fetchResponse()
    
    async function fetchResponse() {
        const response = await fetch( uri )
        const product = await response.json()
        sofaProducts(product);
    }

    let articleClient = {};
   
    articleClient._id = id;

    function sofaProducts(products) {
       
        let imageAlt = document.querySelector("article div.item__img");
        let title = document.querySelector("#title");
        let price = document.querySelector("#price");
        let description = document.querySelector("#description");
        let diffColours = document.querySelector("#colors");
       
        for (let choice of products) {
          
          if (id === choice._id) {
            
            imageAlt.innerHTML = `<img src="${choice.imageUrl}" alt="${choice.altTxt}">`;
            title.textContent = `${choice.name}`;
            price.textContent = `${choice.price}`;
            description.textContent = `${choice.description}`;
           
            for (let colour of choice.colors) {
             
              diffColours.innerHTML += `<option value="${colour}">${colour}</option>`;
            }
          }
        }
        console.log("choice succesful");
      }
     