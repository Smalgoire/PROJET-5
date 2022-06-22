/* Ajout données de test
var lsKey = 0 //variable permettant de génerer des clés différentes dans le localstorage
  //Création d'un objet pour pouvoir stocker toute les informations
  var objKanap1 = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
  kanapId : "107fb5b75607497b96722bda5b504926",
  kanapColor : "Blue",
  kanapQuantity : 1
  }

  var objTransform = JSON.stringify(objKanap1) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
  lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
  localStorage.setItem(lsKey, objTransform)

  var objKanap2 = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
    kanapId : "415b7cacb65d43b2b5c1ff70f3393ad1",
  kanapColor : "Black/Yellow",
  kanapQuantity : 3
    }
  
    var objTransform = JSON.stringify(objKanap2) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
    lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
    localStorage.setItem(lsKey, objTransform)

    var objKanap3 = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
      kanapId : "034707184e8e4eefb46400b5a3774b5f",
      kanapColor : "Red",
      kanapQuantity : 5
      }
    
      var objTransform = JSON.stringify(objKanap3) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
      lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
      localStorage.setItem(lsKey, objTransform)
*/
  
  //Récupération des produits depuis le localStorage

for ( var i = 0, len = localStorage.length; i < len; i++ ) {

  var objTransform = localStorage.getItem( localStorage.key( i ) )
  var objKanap = JSON.parse(objTransform) 
 
  var id = objKanap.kanapId
  //console.log(id)

const cartProducts = document.querySelector('.cart') 

//Crée une variable request et lui assigne un nouvel objet XMLHttpRequest.
var request = new XMLHttpRequest() // XMLHttpRequest permet de récupérer des données à partir d'une URL sans avoir à rafraîchir la page.

var apiEndpoint = 'http://localhost:3000/api/products/' + id;
request.open('GET', apiEndpoint, false) // Ouvre une nouvelle connection, utilisant une requête GET à destination de l'URL de notre API.
request.onload = function showProductInfos () {
  
  // on récupère les données retournées sous format JSON
  var data = JSON.parse(this.response)
  
  if (/*request.status >= 200 && */ request.status < 400) { // On s'assure que le code retourné n'est pas un code d'erreur
    
    const cartItems = document.createElement('section')
    cartItems.setAttribute('id', 'cart__items')
    cartProducts.appendChild(cartItems)

      const cards = document.createElement('article')
      cards.setAttribute('class', 'cart__item')
      cartItems.appendChild(cards)

        const imgContainer = document.createElement('div')
        imgContainer.setAttribute('class', 'cart__item__img')
        cards.appendChild(imgContainer)
          const productImg = document.createElement('img')
          productImg.src = data.imageUrl
          imgContainer.appendChild(productImg)

     //cart__item__content class
      const itemContainer = document.createElement('div')
      itemContainer.setAttribute('class', 'cart__item__content')
      cards.appendChild(itemContainer)

        const contentDescription = document.createElement('div')
        contentDescription.setAttribute('class', 'cart__item__content__description')
        itemContainer.appendChild(contentDescription)

          const title = document.createElement('h2')
          title.textContent = data.name
          contentDescription.appendChild(title)
          const color = document.createElement('p')
          color.textContent = objKanap.kanapColor
          //console.log(objKanap.kanapColor)
          contentDescription.appendChild(color)
          const price = document.createElement('p')
          price.textContent = data.price + ' €'
          contentDescription.appendChild(price)

        const contentSettings = document.createElement('div')
        contentSettings.setAttribute('class', 'cart__item__content__settings')
        itemContainer.appendChild(contentSettings)
          const quantityContainer = document.createElement('div')
          quantityContainer.setAttribute('class', 'cart__item__content__settings__quantity')
          contentSettings.appendChild(quantityContainer)
            const quantity = document.createElement('p')
            quantity.textContent = 'Qté : '
            quantityContainer.appendChild(quantity)
            const selector = document.createElement('input')
            selector.setAttribute('type', 'number')
            selector.setAttribute('class', 'itemQuantity')
            selector.setAttribute('data-lskey', localStorage.key( i )) // Pour pouvoir utiliser dataset par la suite
            selector.setAttribute('name', 'itemQuantity')
            selector.setAttribute('min', '1')
            selector.setAttribute('max', '100')
            selector.setAttribute('value', objKanap.kanapQuantity)
            quantity.appendChild(selector)

          const deleteContainer = document.createElement('div')
          deleteContainer.setAttribute('class', 'cart__item__content__settings__delete')
          contentSettings.appendChild(deleteContainer)
            const deleteItem = document.createElement('p')
            deleteItem.setAttribute('class', 'deleteItem')
            deleteItem.textContent = 'Supprimer'
            deleteContainer.appendChild(deleteItem)

        
  } else { // en cas d'erreur retourné par l'API
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `Désolé, problème technique!`
    cartProducts.appendChild(errorMessage)
  }
}

request.send()

}

//Gestion changement quantité produit
var input = document.getElementsByClassName('itemQuantity') //Retourne un Tableau avec tout les élement correspondants à la classe
for (var i = 0; i < input.length; i++) {
  input[i].addEventListener('change', function(){ //Execution du code lors d'un changement sur le selecteur de quantité

    console.log('change detected')

    //Ici on recupère notre id produit pour savoir précisément quel objet du localstorage on va modifier
    var input = document.getElementsByClassName('itemQuantity')
    for (var i = 0; i < input.length; i++) {
    var getDataKey = input[i].dataset.lskey //via la propriété dataset on peut faire correspondre quel input correspond à quel objet du localstorage via sa clé

    var getKanap = localStorage.getItem( localStorage.key( i ) )
    var kanapChange1 = JSON.parse(getKanap)
    kanapChange1.kanapQuantity = input[i].value // On modifie la quantité en fonction de l'entrée utilisateur

    var kanapChange2 = JSON.stringify(kanapChange1)
    localStorage.setItem(getDataKey, kanapChange2) // On enregistre l'objet avec ses nouvelles valeurs dans localstorage

   }
    
  });
}
