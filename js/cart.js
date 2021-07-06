async function init() {

    const teddies = await getTeddies();
    coverPage(teddies);
    refreshfinalprice();
    removefromcart();
    refreshquantity();
  }

init();
function coverPage(teddies) {
    for (var i = 0; i < localStorage.length; i++) {
        
        teddies.forEach((teddy) => {
            if ((localStorage.key(i))==teddy._id)
            {
                cartfiller(teddy);
            }
        })
    }
}

function cartfiller(teddy) {
    const elt = document.getElementById('modelcart');    
    const dupNode = document.importNode(elt.content,true);
    dupNode.getElementById('cartimg').src= teddy.imageUrl;
    dupNode.getElementById("cartname").textContent= teddy.name;
    dupNode.getElementById("cartprice").textContent= teddy.price/100+"€";
    dupNode.getElementById("cartquantity").value= localStorage.getItem(teddy._id);
    dupNode.getElementById("carttotal").textContent= (teddy.price/100)*parseInt(localStorage.getItem(teddy._id))+"€"
    document.getElementById("cartbody").appendChild(dupNode);
}
//Permet la programmation des boutons supprimer du panier
function removefromcart()
{
let btn_del = document.querySelectorAll(".btn-danger");
let cartlines = document.querySelectorAll(".cartline");
for (let i = 0 ; i< btn_del.length ;i++)
{
    let id_produit = localStorage.key(i);
    btn_del[i].addEventListener("click",function(){
        
        console.log(id_produit);
        localStorage.removeItem(id_produit);
        cartlines[i].innerHTML= "";
        refreshfinalprice();
    })
}
}
//Permet de modifier le prix de la ligne à la modification de la quantité
function refreshquantity()
{
let quantityinput = document.querySelectorAll(".quantityinput");
let productsprices = document.querySelectorAll(".prices");
let producttotal = document.querySelectorAll(".totalprice");
for (let i = 0 ; i< quantityinput.length ;i++)
{
    quantityinput[i].addEventListener("change",function(){
        let id_produit = localStorage.key(i);
        localStorage.setItem(id_produit,quantityinput[i].value);
        producttotal[i].textContent = parseInt(productsprices[i].textContent) * quantityinput[i].value+ "€" ; 
        refreshfinalprice(); 
    })
}
}
//Permet d'actualiser le prix total du panier
function refreshfinalprice()
{
    let finalprice = 0;
    let carttotal = document.querySelectorAll(".totalprice");
    for (let i = 0 ; i<carttotal.length ; i++)
    {
        finalprice += parseInt(carttotal[i].textContent);
    }
    document.getElementById("finalprice").textContent = finalprice+"€";
}

//*********************** ENVOI FORMULAIRE 
//Crée un objet contact avec les champs du formulaire
function createcontact()
{
    const contact = 
    {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    email : document.getElementById('email').value,
    city : document.getElementById('city').value
    }
    return contact
}
//Crée une liste products avec les données du localstorage
function createproducts()
{

    const products = []
    for (let i = 0 ; i<localStorage.length ; i++)
    {
        products.push(localStorage.key(i))
    }
    return products
}
// Validation Regex du formulaire
// Vérification de l'email
function emailIsValid(value) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

// Vérification d'un texte
function textIsValid(value) {
    const regex = /^[A-Za-z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
    return regex.test(value);
}

// Vérification d'une adresse
function addressIsValid(value) {
    const regex = /^([0-9]{1,})[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/;
    return regex.test(value);
}
//Passe en test tous les champs du formulaires
function validationform()
{
    let formisvalid= true;
    let lastname = document.getElementById("lastName").value;
    let firstname = document.getElementById("firstName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    if (textIsValid(lastname))
    {
        document.getElementById("errorlname").innerText = "";
    }
    else
    {
        document.getElementById("errorlname").innerText = "Le nom est incorrect"
        formisvalid = false;
    }
    if (textIsValid(firstname))
    {
        document.getElementById("errorfname").innerText = "";
    }
    else
    {
        document.getElementById("errorfname").innerText = "Le prenom est incorrect"
        formisvalid = false;
    }
    if (emailIsValid(email))
    {
        document.getElementById("erroremail").innerText = "";
    }
    else
    {
        document.getElementById("erroremail").innerText = "L'email est incorrect"
        formisvalid = false;
    }
    if (addressIsValid(address))
    {
        document.getElementById("erroraddress").innerText = "";
    }
    else
    {
        document.getElementById("erroraddress").innerText = "L'adresse est incorrecte"
        formisvalid = false;
    }
    if (textIsValid(city))
    {
        document.getElementById("errorcity").innerText = "";
    }
    else
    {
        document.getElementById("errorcity").innerText = "La ville est incorrecte"
        formisvalid = false;
    }
    return formisvalid;
}
// Configuration de l'envoi des données lors du click sur le bouton payer
const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const order = {
        contact : createcontact()
        ,
        products : createproducts(),
    }
    if(validationform())
    {
        postOrder(order);
    }
})
