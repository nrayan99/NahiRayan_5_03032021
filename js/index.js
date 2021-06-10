async function init() {
  const teddies = await getTeddies();
  coverPage(teddies);
}
init();
async function getTeddies (){
  return fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      console.log(res.json)
      return res.json();
    }
  })
  .then((teddies)=>teddies)
  .catch(function(err) {
    // Une erreur est survenue
  });
}
function coverPage(teddies) {
  teddies.forEach((teddy) => {
    showTeddy(teddy);
  })
}
  function showTeddy(teddy) {
    const elt = document.getElementById('covermodel');
    const dupNode = document.importNode(elt.content,true);
    dupNode.getElementById('imgTeddy').src= teddy.imageUrl;
    dupNode.getElementById("nameTeddy").textContent= teddy.name;
    dupNode.getElementById("priceTeddy").textContent= teddy.price/100+"€";
    dupNode.getElementById("descriptionTeddy").textContent= teddy.description;
    dupNode.getElementById("btnTeddy").href= "products.html?"+teddy._id;
    document.getElementById("teddies").appendChild(dupNode);
  }