//METHODE GET 
async function getTeddies (){
    return fetch(URL)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then((teddies)=>teddies)
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
//METHODE GET BY ID
async function getTeddy (){
return fetch(URL+idteddy)
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then((teddies)=>teddies)
.catch(function(err) {
    // Une erreur est survenue
});
}
//METHODE POST
function postOrder(order){
    return fetch(URL+"order", {
        method : "POST",
        body :  JSON.stringify(order),
        headers : {
            "Content-Type": "application/json",
        }
        })
    .then((response) => response.json())
    .then((json) => {
        document.location.href="confirmation.html?"+json.orderId;
    })
    .catch(() => {
        alert(error)
    })
}
