const idteddy = window.location.search.substring(1); 
async function init() {
    const teddy = await getTeddy(idteddy);
    showTeddy(teddy);
    addtoCart()
  }

init();

function showTeddy(teddy) {
    const elt = document.getElementById('productsmodel');
    const dupNode = document.importNode(elt.content,true);
    dupNode.getElementById('imgTeddy').src= teddy.imageUrl;
    dupNode.getElementById("nameTeddy").textContent= teddy.name;
    dupNode.getElementById("priceTeddy").textContent= teddy.price/100+"€";
    dupNode.getElementById("descriptionTeddy").textContent= teddy.description;
    document.getElementById("productteddies").appendChild(dupNode);
    teddy.colors.forEach((color) => {
        const colors = document.getElementById('colorsmodel');
        const dupColors = document.importNode(colors.content,true);
        dupColors.getElementById("colordiv").textContent=color;
        document.getElementById("colors").appendChild(dupColors);
    })
  }
  
  function addtoCart(){
    document.getElementById("btnTeddy").addEventListener("click",function(e){
        e.preventDefault()
        if (localStorage.getItem(idteddy)) // test si l'élément a déja une quantité dans localstorage 
        {
            let nbitem= parseInt(localStorage.getItem(idteddy),10) +1 //Si oui ajouter 1 à la quantité
            localStorage.setItem(idteddy,nbitem);
        } 
        else 
        {
            localStorage.setItem(idteddy,1);// Si non lui donner la quantité "1"
        }
        alert("Votre article a été ajouté au panier")
    });
}
