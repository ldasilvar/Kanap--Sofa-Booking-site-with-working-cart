
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

          // Determine total quantity and total price

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



