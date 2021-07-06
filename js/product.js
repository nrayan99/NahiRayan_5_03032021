const idteddy = window.location.search.substring(1);
async function init() {
    const teddy = await getTeddy();
    showTeddy(teddy);
    addtocart()
  }

init();

function showTeddy(teddy) {
    const elt = document.getElementById('productsmodel');
    const dupNode = document.importNode(elt.content,true);
    dupNode.getElementById('imgTeddy').src= teddy.imageUrl;
    dupNode.getElementById("nameTeddy").textContent= teddy.name;
    dupNode.getElementById("priceTeddy").textContent= teddy.price/100+"€";
    dupNode.getElementById("descriptionTeddy").textContent= teddy.description;
    dupNode.getElementById("btnTeddy").href= "cart.html?"+teddy._id;
    document.getElementById("productteddies").appendChild(dupNode);
    teddy.colors.forEach((color) => {
        const colors = document.getElementById('colorsmodel');
        const dupColors = document.importNode(colors.content,true);
        dupColors.getElementById("colordiv").textContent=color;
        document.getElementById("colors").appendChild(dupColors);
    })
  }
  
  function addtocart(){
    document.getElementById("btnTeddy").addEventListener("click",function(e){
        e.preventDefault()
        if (localStorage.getItem(idteddy))
        {
            let nbitem= parseInt(localStorage.getItem(idteddy),10) +1
            localStorage.setItem(idteddy,nbitem);
        } 
        else
        {
            localStorage.setItem(idteddy,1);
        }
        alert("Votre article a été ajouté au panier")
    });
}
