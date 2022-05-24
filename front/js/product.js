// Utilisation URLSeatchParams pour récupérer l'ID du produit
var currentURL = document.URL;
var url = new URL(currentURL);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var id = search_params.get('id'); //on récupère l'ID produit qui nous intéresse
}

const Product = document.querySelector('.item') 

//Crée une variable request et lui assigne un nouvel objet XMLHttpRequest.
var request = new XMLHttpRequest() // XMLHttpRequest permet de récupérer des données à partir d'une URL sans avoir à rafraîchir la page.

var apiEndpoint = 'http://localhost:3000/api/products/' + id;
request.open('GET', apiEndpoint, true) // Ouvre une nouvelle connection, utilisant une requête GET à destination de l'URL de notre API.
request.onload = function showProductInfos () {
  // on récupère les données retournées sous format JSON
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) { // On s'assure que le code retourné n'est pas un code d'erreur
    
      const cards = document.createElement('article')
      Product.appendChild(cards)

      const imgContainer = document.createElement('div')
      imgContainer.setAttribute('class', 'item__img')
      cards.appendChild(imgContainer)

      const productImg = document.createElement('img');
      productImg.src = data.imageUrl
      imgContainer.appendChild(productImg)



  } else { // en cas d'erreur retourné par l'API
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `Désolé, problème technique!`
    listProducts.appendChild(errorMessage)
  }
}

request.send()