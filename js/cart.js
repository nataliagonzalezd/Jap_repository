let cartProducts = [];

function sumar() {
  let precios = document.getElementsByClassName("precio");
  let cantidades = document.getElementsByTagName("input");

  let total = 0;
  let subtotal = 0;

  for (let i = 0; i < precios.length; i++) {
    total += parseFloat(precios[i].innerHTML);

    subtotal +=
      parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);

    document.getElementById("res" + i).innerHTML =
      parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].value);
  }
  
  document.getElementById("sub").innerHTML= subtotal.toFixed(2);
  shipping();
  
}


function productsCart(array) {
  let htmlContentToAppend = "";
  let i = 0;

  for (let data of array) {
    htmlContentToAppend += `

        <tr>
        <td>
        <h3>${data.name}</h3>
        </td>
        <td class="text-center mob-hide">
        <a href="producto" class="trsn">
        <img src="${data.src}" >
        </a>
        <td>${data.currency}<span class='precio'>${data.unitCost}</span></td>
        </td>
        <td >
        <input type='number' value=1 min="0" id='cant${i}' onchange='sumar()'> 
        </td>
        <td id='res${i}'> </td>
        </tr>
        
        `;

        i++;

    document.getElementById("cartProducts").innerHTML = htmlContentToAppend;
  }
}

function shipping(){
  
  let subtotal= document.getElementById("sub").innerHTML;
  let porcentaje = 0;
  let envio=0;
  let total=0;

  if(document.getElementById("premium").checked){
    porcentaje=0.15;
    envio = parseFloat(subtotal)*parseFloat(porcentaje);
    total= parseFloat(subtotal) + parseFloat(envio);
  }else if(document.getElementById("express").checked){
    porcentaje=0.07;
    envio = parseFloat(subtotal)*parseFloat(porcentaje);
    total = parseFloat(subtotal) + parseFloat(envio);
  }else if(document.getElementById("standard").checked){
    porcentaje=0.05;
    envio= parseFloat(subtotal)*parseFloat(porcentaje);
    total= parseFloat(subtotal) + parseFloat(envio);
  }

  total= parseFloat(subtotal) + parseFloat(envio);

  document.getElementById("envio").innerHTML= (envio).toFixed(2);
  document.getElementById("total").innerHTML= parseFloat(total).toFixed(2);

}




document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let cartProducts2 = resultObj.data;
      let cartProducts = cartProducts2.articles;
      productsCart(cartProducts);
      sumar();
    }
  });
});
