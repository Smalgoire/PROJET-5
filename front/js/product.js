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
        const productImg = document.createElement('img')
        productImg.src = data.imageUrl
        imgContainer.appendChild(productImg)

      //Inside item__content class
      const itemContainer = document.createElement('div')
      itemContainer.setAttribute('class', 'item__content')
      cards.appendChild(itemContainer)

      const titlePrice = document.createElement('div')
      titlePrice.setAttribute('class', 'item__content__titlePrice')
      itemContainer.appendChild(titlePrice)
        const title = document.createElement('h1')
        title.setAttribute('id', 'title')
        title.textContent = data.name
        titlePrice.appendChild(title)
        const price = document.createElement('p')
        price.textContent= 'Prix : ' + data.price + ' €'
        titlePrice.appendChild(price)

      const descriptionContainer = document.createElement('div')
      descriptionContainer.setAttribute('class', 'item__content__description')
      itemContainer.appendChild(descriptionContainer)
        const descriptionTitle = document.createElement('p')
        descriptionTitle.setAttribute('class', 'item__content__description__title')
        descriptionTitle.textContent = 'Description : '
        descriptionContainer.appendChild(descriptionTitle)
        const description = document.createElement('p')
        description.setAttribute('id', 'description')
        description.textContent = data.description
        descriptionContainer.appendChild(description)

      const settingsContainer = document.createElement('div')
      settingsContainer.setAttribute('class', 'item__content__settings')
      itemContainer.appendChild(settingsContainer)

        const settingsColor = document.createElement('div')
        settingsColor.setAttribute('class', 'item__content__settings__color')
        settingsContainer.appendChild(settingsColor)
          const colorSelector = document.createElement('label')
          colorSelector.setAttribute('for', 'color-select')
          colorSelector.textContent = 'Choisir une couleur : '
          settingsColor.appendChild(colorSelector)
          const selectorOptions = document.createElement('select')
          selectorOptions.setAttribute('name', 'color-select')
          selectorOptions.setAttribute('id', 'colors')
          colorSelector.appendChild(selectorOptions)
            const optionValueExemple = document.createElement('option')
            optionValueExemple.setAttribute('value', '')
            optionValueExemple.textContent = '--SVP, choisissez une couleur --'
            selectorOptions.appendChild(optionValueExemple)
            //Traitement nécessaire pour récupérer les couleurs depuis l'API, sachant quelles diffèrent pour chaque produit
            /*for(let i = 0; i <=3; i++) {  
              var optionsFromAPI = document.createElement('option')       
              optionsFromAPI.setAttribute('value', data.colors[i])
              optionsFromAPI.textContent = data.colors[i]
              selectorOptions.appendChild(optionsFromAPI)
            }*/
            //Traitement nécessaire pour récupérer les couleurs depuis l'API, sachant quelles diffèrent pour chaque produit
            data.colors.forEach ( colors=> {  
              var optionsFromAPI = document.createElement('option')       
              optionsFromAPI.setAttribute('value', colors)
              optionsFromAPI.textContent = colors
              selectorOptions.appendChild(optionsFromAPI)
            })

        const settingsQuantity = document.createElement('div')
        settingsQuantity.setAttribute('class', 'item__content__settings__quantity')
        settingsContainer.appendChild(settingsQuantity)
          const quantitySelector = document.createElement('label')
          quantitySelector.setAttribute('for', 'itemQuantity')
          quantitySelector.textContent = "Nombre d'article(s) (1-100) : "
          settingsQuantity.appendChild(quantitySelector)
          const qSelectorOptions = document.createElement('input')
          qSelectorOptions.setAttribute('type', 'number')
          qSelectorOptions.setAttribute('name', 'itemQuantity')
          qSelectorOptions.setAttribute('min', '1')
          qSelectorOptions.setAttribute('max', '100')
          qSelectorOptions.setAttribute('value', '0')
          qSelectorOptions.setAttribute('id', 'quantity')
          quantitySelector.appendChild(qSelectorOptions)

      const buttonContainer = document.createElement('div')
      buttonContainer.setAttribute('class', 'item__content__addButton')
      itemContainer.appendChild(buttonContainer)
        const linkButton = document.createElement('a')
        linkButton.setAttribute('href', '#')
        buttonContainer.appendChild(linkButton)
          const button = document.createElement('button')
          button.setAttribute('id', 'addToCart')
          button.textContent = "Ajouter au panier"
          linkButton.appendChild(button)

        
  } else { // en cas d'erreur retourné par l'API
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `Désolé, problème technique!`
    listProducts.appendChild(errorMessage)
  }
}

request.send()


//Partie récupération des infos nécessaire, à savoir, id / couleur / Nombre d'articles, pour les stocker dans le localstorage
var lsKey = 0 //variable permettant de génerer des clés différentes dans le localstorage
setTimeout( function () { //Timeout pour accéder aux éléments html crées dynamiquement une fois qu'ils ont terminé de se charger
 document.getElementById('addToCart').onclick = function addToCart () {
  var x = document.getElementById('colors')
  var selectedColor = x.value //Récupération du choix de couleur de l'utilisateur
  var y = document.getElementById('quantity')
  var selectedQuantity = y.value //Récupération du nombre de produit voulu par l'utilisateur

  //Création d'un objet pour pouvoir stocker toute les informations
  var objKanap = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
  kanapId : id,
  kanapColor : selectedColor,
  kanapQuantity : selectedQuantity
  }

  if (lsKey == 0) {
  lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
  var objTransform = JSON.stringify(objKanap) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
  localStorage.setItem(lsKey, objTransform)
  }
  else {
      //checker et comparer tout les items du localstorage
      for ( var i = 0, len = localStorage.length; i < len; i++ ) {
        var getKanap = localStorage.getItem( localStorage.key( i ) )
        var kanapCheck = JSON.parse(getKanap) 
        
        if (id == kanapCheck.kanapId && selectedColor == kanapCheck.kanapColor) { //Pour éviter d'ajouter plusieurs fois le même produit dans localstorage
            console.log('Already Exists')
        }

        else {
          var objTransform = JSON.stringify(objKanap) //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
          lsKey++ //à chaque click sur Ajouter au panier, une clé différente dans le localstorage
          localStorage.setItem(lsKey, objTransform)
        }    
      }
    }
 } 
}, 1000)
