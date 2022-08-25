
let sofaLocalStorage = JSON.parse(localStorage.getItem("product"));

console.log(sofaLocalStorage);

if (sofaLocalStorage) {
    sofaLocalStorage.forEach(function (product, index) {

    fetch(`http://localhost:3000/api/products/${product.productId}`)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (products) {

        // Populate the page using the local storage of products added to cart

        let article = document.createElement("article");
        article.setAttribute('data-id', product.productId);
        article.setAttribute('class', 'cart__item');
        document.getElementById("cart__items").appendChild(article);
        

        let sofaImg = document.createElement("div");
        article.appendChild(sofaImg);
        sofaImg.setAttribute('class', "cart__item__img");

       
        let image = document.createElement("img");
        sofaImg.appendChild(image);
        image.setAttribute('src', products.imageUrl);
        image.setAttribute('alt', products.altTxt);

        
        let cartCont= document.createElement("div");
        article.appendChild(cartCont);
        cartCont.setAttribute('class', "cart__item__content");

        
        let contDesc = document.createElement("div");
        cartCont.appendChild(contDesc);
        contDesc.setAttribute('class', "cart__item__content__titlePrice");

        
        let title = document.createElement("h2");
        contDesc.appendChild(title);
        title.innerText = products.name;

        
        let color = document.createElement("p");
        contDesc.appendChild(color);
        color.innerText = product.sofaColour;

        
        let price = document.createElement("p");
        contDesc.appendChild(price);
        price.innerText = products.price + " €";

        
        let cartSettings = document.createElement("div");
        cartCont.appendChild(cartSettings);
        cartSettings.setAttribute('class', "cart__item__content__settings");

        
        let cartQuant = document.createElement("div");
        cartSettings.appendChild(cartQuant );
        cartQuant .setAttribute('class', "cart__item__content__settings__quantity");


        let quantPar = document.createElement("p");
        cartQuant .appendChild(quantPar);
        quantPar.innerText = "Quantity : ";

       
        let sofaQuantity = document.createElement("input");
        cartQuant.appendChild(sofaQuantity);
        sofaQuantity.value = product.sofaQuantity;
        sofaQuantity.className = "itemQuantity";
        sofaQuantity.setAttribute("type", "number");
        sofaQuantity.setAttribute("min", "1");
        sofaQuantity.setAttribute("max", "100");
        sofaQuantity.setAttribute("name", "itemQuantity");

        
        let divDelete = document.createElement("div");
        cartSettings.appendChild(divDelete);
        divDelete.setAttribute('class', "cart__item__content__settings__delete");

        
        let pDelete = document.createElement("p");
        divDelete.appendChild(pDelete);
        pDelete.setAttribute('class', "deleteItem");
        pDelete.innerText = "Remove";

    
        //Event listener to track when pDelete is clicked to remove an item.
        pDelete.addEventListener('click', () => {

          // On click this removes 1 element at index i

          sofaLocalStorage.splice(index, 1);

          // send the new data to the localStorage

          localStorage.setItem("product", JSON.stringify(sofaLocalStorage));

          console.log(sofaLocalStorage);

          // message after deleted item and refresh the page

          alert("⚠️ The selected sofa will be deleted from your cart!");

          window.location.reload();

        });

        // Event listener to modify the cart quantity of products and to save the changes in updateQuantity

        sofaQuantity.addEventListener('change', function (event) {
          event.stopPropagation();

          console.log(typeof sofaQuantity.value);
          console.log(typeof Number(sofaQuantity.value));

          let updatedQuantity = Number(sofaQuantity.value);

          if (updatedQuantity <= 0) {
            alert('❌ You can NOT enter 0 or negative values!');
            window.location.reload();
          }
          else if (updatedQuantity > 100) {
            alert('❌ You can NOT purchase more than 100 of the same sofa!');
            window.location.reload();
          }
          else if (updatedQuantity >= 1 && updatedQuantity <= 100) {
            sofaLocalStorage[index].sofaQuantity = updatedQuantity;
            localStorage.setItem('product', JSON.stringify(sofaLocalStorage));
            totalPrice();
          }
          window.location.reload();

        })

        // Function to calculate the total price of items in the cart
        var changeQuantity = document.querySelectorAll(".itemQuantity");

        function totalPrice() {

          let totalQuantity = 0;
          let displayTotalPrice = 0;

          changeQuantity.forEach(element => {
            totalQuantity += Number(changeQuantity[index].value);
            displayTotalPrice += Number((changeQuantity[index].value * products.price));

          });

          let productTotalQuantity = document.getElementById('totalQuantity');
          productTotalQuantity.innerText = totalQuantity;

          let showTotalPrice = document.getElementById("totalPrice");
          showTotalPrice.innerText = displayTotalPrice;

        
        }
        totalPrice();
      });
  });
}

//Form Validation


var regExText = /^[a-zA-Z\s\'\-]{2,20}$/; //regEx will be used to validate first name, last name and city
var regExAddress = /^[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}$/;
var regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

function validateFirstName() {

  
  
  let firstName = document.getElementById("firstName").value;

  if (regExText.test(firstName)) {//if input is valid, update page to show succesful entry
    document.getElementById("firstNameErrorMsg").innerText = "✅ Name is valid!";
    return true;
  }
  else {//if input is invalid, update page to prompt for new input
    document.getElementById("firstNameErrorMsg").innerText = "⚠️ Please enter a valid name using 2-20 characters";
    return false;
  }
}

function validatelastName() {

  let lastName = document.getElementById("lastName").value;

  if (regExText.test(lastName)) {
    document.getElementById("lastNameErrorMsg").innerText = "✅ Last name is valid!";
    return true;
  }
  else {
    document.getElementById("lastNameErrorMsg").innerText = "⚠️ Please enter a valid last name using 2-20 characters";
    return false;
  }
}

function validateAddress() {

  let address = document.getElementById("address").value;

  if (regExAddress.test(address)) {
    document.getElementById("addressErrorMsg").innerText = "✅ Address is valid!";
    return true;
  }
  else {
    document.getElementById("addressErrorMsg").innerText = "⚠️ Format E.g.: 01 xxxxxxxx 12345";
    return false;
  }
}

function validateCity() {

  let city = document.getElementById("city").value;

  if (regExText.test(city)) {
    document.getElementById("cityErrorMsg").innerText = "✅ City name is valid!";
    return true;
  }
  else {
    document.getElementById("cityErrorMsg").innerText = "⚠️ Please enter a valid city name!";
    return false;
  }
}

function validateEmail() {

  let email = document.getElementById("email").value;

  if (regExEmail.test(email)) {
    document.getElementById("emailErrorMsg").innerText = "✅ Email address is valid!";
    return true;
  } else {
    document.getElementById("emailErrorMsg").innerText = "⚠️ Please enter a valid email address!";
    return false;
  }
}


var formSubmitButton = document.querySelector('.cart__order__form');

formSubmitButton.addEventListener('change', function () {
  validateFirstName(firstName);
  validatelastName(lastName);
  validateAddress(address);
  validateCity(city);
  validateEmail(email);
});


const formButton = document.getElementById('order');
console.log(formButton);

formButton.addEventListener('click', event => {
  event.preventDefault();

  // put the form values in an object
  // put the values of the form and the selected products in an object to send to the server

  var contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  }

  if (firstName.value.length == 0 ||
    lastName.value.length == 0 ||
    address.value.length == 0 ||
    city.value.length == 0 ||
    email.value.length == 0) {
    alert("⚠️ Please fill the form!");

  } else if (regExEmail.test(email.value) == false || regExAddress.test(address.value) == false || regExText.test(city.value) == false || regExText.test(firstName.value) == false || regExText.test(lastName.value) == false) {
    alert("⚠️ Please provide valid values on the form!");

  }
  else if (sofaLocalStorage== null || sofaLocalStorage == 0) {
    alert('⚠️ Please choose a product!')
  }
    else {

        localStorage.setItem('contact', JSON.stringify(contact));
    
        let products = []; // see id of selected product
    
        sofaLocalStorage.forEach(productSelected => {
          products.push(productSelected.productId);
    
        });
    
        console.log(products);
        console.log(typeof products); // object
    
        let userInfo = {
          contact, // object type
          products,  // object type
        }
    
        console.log(userInfo);
        console.log(typeof contact); // object
    
        let urlOrder = "http://localhost:3000/api/products/order"
    
        fetch(urlOrder, {
          method: 'POST',
          body: JSON.stringify(userInfo),
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
        })
          .then(function (response) {
            if (response.ok) {
              return response.json();
            }
          })
          .then(function (info) {
    
            console.log(info);
    
            location.href = `confirmation.html?id=${info.orderId}`;
    
            console.log(`confirmation.html?id=${info.orderId}`);
    
          })
          .catch(function (error) {
            alert("⚠️ Post error!");
    
          });
    
      }
    
    });
    

