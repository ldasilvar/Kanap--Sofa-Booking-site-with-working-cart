// API localhost
const uri = "http://localhost:3000/api/products";

//Function to populate all the sofa products on the main page from the API

function displaySofas() {
  fetch(uri) // fetch the localhost
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (products) {
      console.log(products);

     
      //using for each of the products to create the cards on the DOM for each sofa
      products.forEach(product => {

        

        console.log(product);

        
        let sofaLink = document.createElement('a');
        sofaLink.setAttribute('href', `product.html?id=${product._id}`);
        document.getElementById('items').appendChild(sofaLink);

        let article = document.createElement('article');
        sofaLink.appendChild(article);

        let image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);
        article.appendChild(image);

        let title = document.createElement('h3');
        title.setAttribute('class', 'productName');
        article.appendChild(title);
        title.innerText = product.name;

        let description = document.createElement('p');
        description.setAttribute('class', 'productDescription');
        article.appendChild(description);
        description.innerText = product.description;

      });

    })
    .catch(function (error) {
      alert("⚠️ Error! Fetch()!")
    });
}
displaySofas();

