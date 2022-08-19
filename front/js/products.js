const idLocator = window.location.search;


const params = new URLSearchParams(idLocator);


let productId = params.get("_id");

const uri = 'http://localhost:3000/api/products';


let response;

    fetchResponse()
    
    async function fetchResponse() {
        const response = await fetch( uri )
        const products = await response.json()
        sofaProducts(products)

    
    }
    


// Function to populate the products page using the API and the URL Search Params of the product clicked

    function sofaProducts(products) {
       
        let imageAlt = document.querySelector("article div.item__img");
        let title = document.querySelector("#title");
        let price = document.querySelector("#price");
        let description = document.querySelector("#description");
        let diffColours = document.querySelector("#colors");
       
        for (let choice of products) {
          
          if (productId === choice._id) {
            
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


let cartButton = document.getElementById("addToCart");
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');

let productLocalStorageString = localStorage.getItem("product");
let productLocalStorage = JSON.parse(productLocalStorageString);


















