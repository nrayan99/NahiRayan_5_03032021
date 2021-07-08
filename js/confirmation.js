const orderid=window.location.search.substring(1);

async function init() {
    const teddies = await getTeddies();
    showfinalprice(teddies)
    showorderid(orderid)
    localStorage.clear()
  }

init();
//Permet d'afficher le prix final de la commande
function showfinalprice(teddies)
{
    let finalprice = 0;
    teddies.forEach((teddy) => {
        for(let i = 0 ; i<localStorage.length;i++)
        {
            if (teddy._id==localStorage.key(i))
            {
                finalprice+= teddy.price*localStorage.getItem(teddy._id)
            } 
        }
        
    })
    document.getElementById("priceconfirmation").innerText= finalprice/100+"€";
}
// Permet d'afficher le numéro de commande
function showorderid(orderid)
{
    document.getElementById("idconfirmation").textContent = orderid ;
}