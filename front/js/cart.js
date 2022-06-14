/*  Ajout données de test
var lsKey = 0 //variable permettant de génerer des clés différentes dans le localstorage
  //Création d'un objet pour pouvoir stocker toute les informations
  var objKanap1 = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
  kanapId : "107fb5b75607497b96722bda5b504926",
  kanapColor : "Blue",
  KanapQuantity : 1
  }

  var objTransform = JSON.stringify(objKanap1) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
  lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
  localStorage.setItem(lsKey, objTransform)

  var objKanap2 = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
    kanapId : "415b7cacb65d43b2b5c1ff70f3393ad1",
  kanapColor : "Black/Yellow",
  KanapQuantity : 3
    }
  
    var objTransform = JSON.stringify(objKanap2) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
    lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
    localStorage.setItem(lsKey, objTransform)

    var objKanap3 = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
      kanapId : "034707184e8e4eefb46400b5a3774b5f",
      kanapColor : "Red",
      KanapQuantity : 5
      }
    
      var objTransform = JSON.stringify(objKanap3) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
      lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
      localStorage.setItem(lsKey, objTransform)
  */
  
  //Récupération d'un produit depuis le localStorage
  var objTransform = localStorage.getItem("1")
  var objKanap = JSON.parse(objTransform)

  var id = objKanap.kanapId
  console.log(id)

const cartProducts = document.querySelector('.cart') 

//Crée une variable request et lui assigne un nouvel objet XMLHttpRequest.
var request = new XMLHttpRequest() // XMLHttpRequest permet de récupérer des données à partir d'une URL sans avoir à rafraîchir la page.

var apiEndpoint = 'http://localhost:3000/api/products/' + id;
request.open('GET', apiEndpoint, true) // Ouvre une nouvelle connection, utilisant une requête GET à destination de l'URL de notre API.
request.onload = function showProductInfos () {
  // on récupère les données retournées sous format JSON
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) { // On s'assure que le code retourné n'est pas un code d'erreur
    
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
          contentDescription.appendChild(color)
          const price = document.createElement('p')
          price.textContent= data.price + ' €'
          contentDescription.appendChild(price)

        
  } else { // en cas d'erreur retourné par l'API
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `Désolé, problème technique!`
    listProducts.appendChild(errorMessage)
  }
}

request.send()

