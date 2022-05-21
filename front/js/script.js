//Code JavaScript pour lister sur la Page d'acceuil l'ensemble des produits retournés par l'API
const listProducts = document.getElementById('items') //id de la div html dans laquelle on veux afficher le résultat

var request = new XMLHttpRequest() // Create a request variable and assign a new XMLHttpRequest object to it.

request.open('GET', 'http://localhost:3000/api/products', true) // Open a new connection, using the GET request on the URL endpoint
request.onload = function listKanaps () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) { // On s'assure que le code retourné n'est pas un code d'erreur
    data.forEach(products => { //fonction fléchée

      const cards = document.createElement('article') //On crée une div article(et on colle au Css déjà définit) qui sera le conteneur de chaque produits

      const kanapImg = document.createElement('img') 
      kanapImg.src = products.imageUrl

      const kanapName = document.createElement('h3') //On précise bien le h3 pour coller avec le Css prédéfinit
      kanapName.textContent = products.name

      const kanapDescription = document.createElement('p')
      kanapDescription.textContent = products.description

      listProducts.appendChild(cards) // On ajoute les articles à l'intérieur de notre section items
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

