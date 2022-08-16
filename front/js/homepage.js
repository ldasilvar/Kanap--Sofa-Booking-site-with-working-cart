const uri = 'http://http://localhost:3000/api/products'

fetch (uri)
    .then((response) => response.json())
    .then((data) => console.log(data));
    