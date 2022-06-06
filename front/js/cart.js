
//Gestion ajout d'un produit au panier (Localstorage)
function saveProductInfos () {

  var x = document.getElementById('colors')
  var selectedColor = x.value //Récupération du choix de couleur de l'utilisateur
  
  var y = document.getElementById('quantity')
  var selectedQuantity = y.value //Récupération du nombre de produit voulu par l'utilisateur
  
  //Création d'un objet pour pouvoir stocker toute les informations
  var objKanap = { // Pour mémoriser des valeurs complexes, on utilise le format JSON (JavaScript Objet Notation)
    kanapId : id,
    kanapColor : selectedColor,
    KanapQuantity : selectedQuantity
  } 
  
  //stockage dans le localStorage
  var objTransform = JSON.stringify(objKanap); //on sérialise (ou linéarise) l’objet avec la syntaxe JSON.stringify().Cette opération transforme l’objet en une chaîne de caractères.
  localStorage.setItem("kanapProduct1", objTransform)

  //Récupération d'un produit depuis le localStorage
  var objTransform = localStorage.getItem("kanapProduct1")
  var objKanap = JSON.parse(objTransform)
