

const uri = 'http://localhost:3000/api/products'


fetch(uri)
    .then((res) => res.json())
    .then((data) => createSofaCards(data));


function createSofaCards (array) {
    const container = document.getElementById('#items');
    const length = array.length;

    for (let i=0; i<length; i++) {
       const card = createSofaCards(array[i]);
       container.appendChild(card);

    }
}

function createCard(obj){

    const card = document.createElement('article');

    const colours = document.createElement('p')
    const img = document.createElement('img');
    const name = document.createElement('h3');
    const price = document.createElement('p');
    const description = document.createElement('p')
    const altText = document.createElement('p')

    card.classList.add('card');

    name.innerHTML = obj.name;
    price.innerText = obj.price;

    img.setAttribute('src', obj.imageUrl)

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);

    return card;



}