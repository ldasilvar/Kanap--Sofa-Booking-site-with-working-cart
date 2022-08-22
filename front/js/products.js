
let queryString = window.location.search;

console.log(window.location); 

let urlParams = new URLSearchParams(queryString);

let productId = urlParams.get("id");

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
        alert('Error fetch()!')

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
let colour = document.getElementById('colors');


//This stores the value in the local storage
let sofaLocStorString = localStorage.getItem("product");
console.log(sofaLocStorString); 

let sofaLocalStorage = JSON.parse(sofaLocStorString);
console.log(sofaLocalStorage);

function addSofaToCart(product) {
    cartButton.addEventListener("click", (event) => {

        

        let sofaProperties = {
            productId: productId,
            sofaColour: color.value,
            productQuantity: Number(quantity.value),
        }

        if ((quantity.value == 0 || quantity.value == null) && (color.value == 0 || color.value == null)) {
            alert('⚠️ Please choose the quantity and a colour!');
            window.location.reload();
        }
        else if (color.value == 0 || color.value == null) {
            alert('⚠️ Please choose a colour!');
            window.location.reload();
        }
        else if (quantity.value == 0 || quantity.value == null) {
            alert('⚠️ Please choose the quantity enter 0 and 101!');
            window.location.reload();
        }
        else if (quantity.value < 0) {
            alert('⚠️ You can NOT choose a negative value!');
            window.location.reload();
        }
        else if (quantity.value > 100) {
            alert('⚠️ You can NOT choose a value greater than 100!');
            window.location.reload();
        }
        else if (quantity.value > 0 && quantity.value <= 100) {

            const messageAlert = function () {

                alert(`
                ✅ The selected product was added to the cart! 
                
                ✔️ Product quantity: ${sofaProperties.productQuantity} 
                ✔️ Product name: ${product.name} 
                ✔️ Product color: ${sofaProperties.sofaColour}`);
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
                    newQuantity = Number(sofaProperties.productQuantity) + Number(sofaLocalStorage[filterProduct].productQuantity);


                    if (sofaLocalStorage[filterProduct].productQuantity == 100) {
                        alert(`✅ You already chosed "${sofaLocalStorage[filterProduct].productQuantity}" product for the product "${product.name}", thus you can NOT choose more product!`);
                        window.location.reload();
                    }

                    else if ((sofaLocalStorage[filterProduct].productQuantity + sofaProperties.productQuantity) > 100) {
                        alert(`✅ You have already added "${sofaLocalStorage[filterProduct].productQuantity}" products for the product "${product.name}", thus you can add maximum "${100 - sofaLocalStorage[filterProduct].productQuantity}" from the same product!`);
                        window.location.reload();

                    }

                    else if (newQuantity <= 100) {
                        sofaLocalStorage[filterProduct].productQuantity = newQuantity;
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


