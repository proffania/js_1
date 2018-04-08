"USE STRUCT";
var item = document.getElementsByClassName("item"),
    btn = document.getElementsByTagName("input");


for (var i = 0; i < btn.length; i++) {
    btn[i].onclick = buy;
}

function buy(eventObj) {
//    console.log(eventObj);
    var cart = document.getElementById("cart_items");
//    cart.innerHTML = "";
    var nameItem = eventObj.path[1].childNodes[1].outerText;
//    console.log(nameItem);
    var priceItem = +(eventObj.path[1].childNodes[5].childNodes[1].outerText);
//    console.log(priceItem);
    var cartItem = document.createElement('p');
    cartItem.innerHTML = nameItem +':... '+ priceItem+'руб';
//    console.log(cart);
   cart.appendChild(cartItem);
    var total = document.getElementById("total");
    total.innerHTML = +(total.innerHTML)+priceItem;
    
   
}
