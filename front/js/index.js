// import fetch from 'node-fetch'

// import fetch from 'node-fetch' 

const uri = 'http://localhost:3000/api/products'
let response;

// document.addEventListener("DOMContentLoaded", function(){
//     console.log('DOM loaded')
    fetchResponse()
    
    async function fetchResponse() {
        const response = await fetch( uri )
        const sofas = await response.json()
        createSofaCards( sofas )

    // .catch(function (error) {
    //         alert("⚠️ Error! Fetch()!")
    //       }
    }
// })

// Function to create the sofa cards on the main page using the API

function createSofaCards(index) {
   
    let zoneArticle = document.querySelector("#items");
   
    for (let article of index) {
      
      zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
    }




    
// function createSofaCards (array) {
//     const container = document.getElementById('items');
//     const length = array.length;

//     for (let i=0; i<length; i++) {
//        const card = createSofaCards(array[i]);
//        container.appendChild(card);

//     }
// }

// function createCard(obj){

//     const card = document.createElement('article');

//     const colours = document.createElement('p')
//     const img = document.createElement('img');
//     const name = document.createElement('h3');
//     const price = document.createElement('p');
//     const description = document.createElement('p')
//     const altText = document.createElement('p')

//     card.classList.add('card');

//     name.innerHTML = obj.name;
//     price.innerText = obj.price;

//     img.setAttribute('src', obj.imageUrl)

//     card.appendChild(img);
//     card.appendChild(name);
//     card.appendChild(price);

//     return card;



}