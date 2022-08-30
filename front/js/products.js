
let windloc = window.location.search;

console.log(window.location); 

let params = new URLSearchParams(windloc);

let productId = params.get("id");

console.log(productId); 

let productLink = `http://localhost:3000/api/products/${productId}`;

console.log(productLink); 

function fetchSofa() {
    fetch(productLink).then((response) => {
        return response.json();

    }).then(function (product) {

        console.log(product);

        if (product) {
            displaySofa(product);
            addSofaToCart(product);
        }

    }).catch((error) => {
        alert('Error in fetching products from API()!')

    })
}
fetchSofa();

// Display the image of the sofa clicked on and the title, price, description and colour 

function displaySofa(product) {

    let sofaImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(sofaImage);
    sofaImage.setAttribute('src', product.imageUrl);
    sofaImage.setAttribute('alt', product.altTxt);

    let sofaTitle = document.getElementById('title');
    sofaTitle.innerText = product.name;

    let sofaPrice = document.getElementById('price');
    sofaPrice.innerText = product.price;

    let sofaDescription = document.getElementById('description');
    sofaDescription.innerText = product.description;

    // The forEach Method is used to display different colours
 
    product.colors.forEach(color => {
        console.log(color);
        let sofaColour = document.createElement("option");
        document.getElementById('colors').appendChild(sofaColour);
        sofaColour.setAttribute('value', color);
        sofaColour.innerText = color;
       
    });
}

// Define the DOM elements you need to call 

let cartButton = document.getElementById("addToCart");
let quantity = document.getElementById('quantity');
let color = document.getElementById('colors');


//Stores the value in the local storage
let sofaLocStorString = localStorage.getItem("product");
console.log(sofaLocStorString); 

let sofaLocalStorage = JSON.parse(sofaLocStorString);
console.log(sofaLocalStorage);


function addSofaToCart(product) {
    cartButton.addEventListener("click", (event) => {

        let sofaProperties = {
            productId: productId,
            sofaColour: color.value,
            sofaQuantity: Number(quantity.value),
            sofaPrice: Number(product.price)
        }

        if ((quantity.value == 0 || quantity.value == null) && (color.value == 0 || color.value == null)) {
            alert('⚠️ Please choose the number of products you wish to purchase and the colour!');
            window.location.reload();
        }
        else if (color.value == 0 || color.value == null) {
            alert('⚠️ Please choose the colour of the sofa you would like!');
            window.location.reload();
        }
        else if (quantity.value == 0 || quantity.value == null) {
            alert('⚠️ Please enter a quantity between 1 and 100');
            window.location.reload();
        }
        else if (quantity.value < 0) {
            alert('❌ You can NOT choose a quantity of less than 1 product');
            window.location.reload();
        }
        else if (quantity.value > 100) {
            alert('❌ You can NOT choose a quantity of more than 100!');
            window.location.reload();
        }
        else if (quantity.value > 0 && quantity.value <= 100) {

            const messageAlert = function () {

                alert(`
                ✅ The sofa you selected was added to the cart! 
                
                ✔️ Product quantity: ${sofaProperties.sofaQuantity} 
                ✔️ Product name: ${product.name} 
                ✔️ Colour of sofa: ${sofaProperties.sofaColour}`);
            }

            if (sofaLocalStorage == null || sofaLocalStorage == 0) {
                sofaLocalStorage = [];
                sofaLocalStorage.push(sofaProperties);
                localStorage.setItem("product", JSON.stringify(sofaLocalStorage));
                messageAlert();
                location.assign("cart.html");
            }

            else {
                const filterProduct = sofaLocalStorage.findIndex(
                    item => item.productId === productId && item.sofaColour === color.value);

                console.log(filterProduct);

                if (filterProduct >= 0) {
                    newQuantity = Number(sofaProperties.sofaQuantity) + Number(sofaLocalStorage[filterProduct].sofaQuantity);


                    if (sofaLocalStorage[filterProduct].sofaQuantity == 100) {
                        alert(`✅ You already chose "${sofaLocalStorage[filterProduct].sofaQuantity}" sofas in our "${product.name}" line, and therefore you can NOT add any more!`);
                        window.location.reload();
                    }

                    else if ((sofaLocalStorage[filterProduct].sofaQuantity + sofaProperties.sofaQuantity) > 100) {
                        alert(`✅ You have already added "${sofaLocalStorage[filterProduct].sofaQuantity}" sofas in our "${product.name}" line, and therefore you can add a maximum of "${100 - sofaLocalStorage[filterProduct].sofaQuantity}" from the same line!`);
                        window.location.reload();

                    }

                    else if (newQuantity <= 100) {
                        sofaLocalStorage[filterProduct].sofaQuantity = newQuantity;
                        localStorage.setItem("product", JSON.stringify(sofaLocalStorage));
                        messageAlert();
                        location.assign("cart.html");
                    }
                }

                else {
                    sofaLocalStorage.push(sofaProperties);
                    localStorage.setItem("product", JSON.stringify(sofaLocalStorage));
                    messageAlert();
                    location.assign("cart.html");
                }
            }
        } else {
            alert('⚠️ Product is not shown on the product page!')

        }
    })
}


