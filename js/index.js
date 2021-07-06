async function init() {
  const teddies = await getTeddies();
  coverPage(teddies);
  addtoCart(teddies)
}
init();
function coverPage(teddies) {
  teddies.forEach((teddy) => {
    showTeddy(teddy);
  })
}
  function showTeddy(teddy) {
    const elt = document.getElementById('covermodel');
    const dupNode = document.importNode(elt.content,true); //Permet de creer une copie de la template
    // On modifie ensuite chaque attribut de la template avec les données récuprer de l'API pour chaque teddy
    dupNode.getElementById('imgTeddy').src= teddy.imageUrl;
    dupNode.getElementById("nameTeddy").textContent= teddy.name;
    dupNode.getElementById("priceTeddy").textContent= teddy.price/100+"€";
    dupNode.getElementById("descriptionTeddy").textContent= teddy.description;
    dupNode.getElementById("btnTeddy").href= "products.html?"+teddy._id;
    dupNode.getElementById('teddyCard').href="products.html?"+teddy._id;
    document.getElementById("teddies").appendChild(dupNode);
    
  }
  // Programmation des boutons ajouter au panier
  function addtoCart(teddies)
  {
  let btn_add = document.querySelectorAll(".AddToCartBtn");
  for (let i = 0 ; i< btn_add.length ;i++)
  {
      
      btn_add[i].addEventListener("click",function(e){
        e.preventDefault();
       
        if(localStorage.getItem(teddies[i]._id)>=1)
        {
          let nb_teddy = localStorage.getItem(teddies[i]._id)
          nb_teddy = parseInt(nb_teddy) +1
          localStorage.setItem(teddies[i]._id,nb_teddy);
          
        }
        else
        {
          localStorage.setItem(teddies[i]._id,1)
        }
        alert("Votre article a été ajouté au panier")
      })
  }
  }