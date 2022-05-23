// Utilisation URLSeatchParams pour récupérer l'ID du produit
var currentURL = document.URL;
var url = new URL(currentURL);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var id = search_params.get('id'); //on récupère l'ID produit qui nous intéresse
}
//Code JavaScript pour lister sur la Page d'acceuil l'ensemble des produits retournés par l'API
const Product = document.getElementById('item') //id de la div html dans laquelle on veux afficher l'ensemble des produits

//Crée une variable request et lui assigne un nouvel objet XMLHttpRequest.
var request = new XMLHttpRequest() // XMLHttpRequest permet de récupérer des données à partir d'une URL sans avoir à rafraîchir la page.

request.open('GET', 'http://localhost:3000/api/products', true) // Ouvre une nouvelle connection, utilisant une requête GET à destination de l'URL de notre API.
request.onload = function showProductInfos () {
  // on récupère les données retournées sous format JSON
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) { // On s'assure que le code retourné n'est pas un code d'erreur
    
      const productImg = document.createElement('img'); // Document représente n'importe quelle page web chargée dans le navigateur et sert de point d'entrée pour accéder au contenu de la page qui est formé par l'arbre du DOM.
      productImg.src = products.imageUrl

  } else { // en cas d'erreur retourné par l'API
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `Désolé, problème technique!`
    listProducts.appendChild(errorMessage)
  }
}

request.send()