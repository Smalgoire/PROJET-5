//Code JavaScript pour lister sur la Page d'acceuil l'ensemble des produits retournés par l'API
const listProducts = document.getElementById('items') //id de la div html dans laquelle on veux afficher l'ensemble des produits

//Crée une variable request et lui assigne un nouvel objet XMLHttpRequest.
var request = new XMLHttpRequest() // XMLHttpRequest permet de récupérer des données à partir d'une URL sans avoir à rafraîchir la page.

request.open('GET', 'http://localhost:3000/api/products', true) // Ouvre une nouvelle connection, utilisant une requête GET à destination de l'URL de notre API.
request.onload = function listKanaps () {
  // on récupère les données retournées sous format JSON
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) { // On s'assure que le code retourné n'est pas un code d'erreur
    data.forEach(products => { //fonction fléchée

      const links = document.createElement('a'); // Document représente n'importe quelle page web chargée dans le navigateur et sert de point d'entrée pour accéder au contenu de la page qui est formé par l'arbre du DOM.
      var urlID = "./front/html/product.html?id="; // ? indique la fin de l'URL et le début des paramètres associés à l'URL
      urlID += products._id; // On ajoute l'ID retourné par l'API à notre URL
      links.href = urlID;

      listProducts.appendChild(links) 

      const cards = document.createElement('article') //On crée une div article(et on colle au Css déjà définit) qui sera le conteneur de chaque produits
      links.appendChild(cards) // On ajoute les articles à l'intérieur de notre parent links.

      const kanapImg = document.createElement('img') 
      kanapImg.src = products.imageUrl

      const kanapName = document.createElement('h3') 
      kanapName.textContent = products.name

      const kanapDescription = document.createElement('p')
      kanapDescription.textContent = products.description

      cards.appendChild(kanapImg)
      cards.appendChild(kanapName)
      cards.appendChild(kanapDescription)

    })
  } else { // en cas d'erreur retourné par l'API
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `Désolé, problème technique!`
    listProducts.appendChild(errorMessage)
  }
}

request.send()

