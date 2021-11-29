let cartProducts = [];

function sumar() {
  let precios = document.getElementsByClassName("prices");
  let cantidades = document.getElementsByClassName("qt");

  let total = 0;
  let subtotal = 0;

  for (let i = 0; i < precios.length; i++) {
    total += parseFloat(precios[i].innerHTML);

    subtotal +=
      parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].innerHTML);

    document.getElementById("res" + i).innerHTML =
      parseFloat(precios[i].innerHTML) * parseFloat(cantidades[i].innerHTML);
  }
  
  document.getElementById("sub").innerHTML= `${subtotal.toFixed(2)}`;
  shipping();
  
}



function productsCart(array) {
  let htmlContentToAppend = "";
  let i = 0;
  if (cartProducts.length == 0) {
    document.getElementById("cartProducts").innerHTML = htmlContentToAppend;
}
  for (let data of array) {
    htmlContentToAppend += `

    <section id="cart"> 
    <article class="product">
    <header>
    <a class="remove" onclick="remove(${i})">
    <img src="${data.src}" alt="">
    <h3>Eliminar Producto</h3>
   </a>
   </header>
   <div class="content">

   <h1>${data.name}</h1>

      </div>

        <footer class="content">
            <span class="qt-minus" onclick="rest(${i}), sumar()">-</span>
            <span class="qt" id="change${i}">${data.count}</span>
            <span class="qt-plus" onclick="plus(${i}), sumar()">+</span>

            <h2 class="full-price" id="res${i}">
            </h2>

            <h2 class="price">
            ${data.currency}<span class="prices">${data.unitCost}</span>
            </h2>
        </footer>
        </article>

        </section>
        </div>
        
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
      cartProducts = cartProducts2.articles;
      productsCart(cartProducts);
      sumar();
    }
  });
});

function plus(i){
let ct = "change" + i;
let count = document.getElementById(ct).innerHTML;
let suma = parseFloat(count) + 1;
document.getElementById(ct).innerHTML= suma;

}

function rest(i){
  let ct = "change" + i;
  let count = document.getElementById(ct).innerHTML;
  let rest = parseFloat(count) - 1;
  if (count<1){
    document.getElementById(ct).innerHTML= 0;
  }else{
    document.getElementById(ct).innerHTML= rest;
  }
  }

  function checkOut(){
  let name= document.getElementById("firstname").value;
  let lastname= document.getElementById("lastname").value;
  let street= document.getElementById("address").value;
  let country= document.getElementById("country").value;
  let door= document.getElementById("zipcode").value;
  let city= document.getElementById("city").value;
  let state= document.getElementById("state").value;

    let cantidades = document.getElementsByClassName("qt");
   let sum = 0;
  for (let i = 0; i < cantidades.length; i++) {
    sum += parseFloat(cantidades[i].innerHTML);
  }
if(sum!=0 && name!="" && lastname!="" && street!="" && country!="" && door!="" && city!="" && state!=""){ console.log("ok");
  swal("Compra realizada con éxito", "Vuelva pronto", "success", {
    button: "Volver al carrito",
  });
}else{ console.log("no");
  swal("La compra no pudo ser realizada con exito", "Complete todos los datos requeridos", "error", {
    button: "Volver al carrito",
  });
}
 }

 document.getElementById("customRadio1").addEventListener("click",()=>{
  document.getElementById("cc-number").disabled = false;
  document.getElementById("cc-exp").disabled = false;
  document.getElementById("cc-cvc").disabled = false;
  document.getElementById("cc-t").disabled = false;
  document.getElementById("cc-number1").disabled = true;
  document.getElementById("monto").disabled = true;
  document.getElementById("banco").disabled = true;
  document.getElementById("cc-t2").disabled = true;
});

document.getElementById("customRadio2").addEventListener("click",()=>{
  document.getElementById("cc-number").disabled = true;
  document.getElementById("cc-exp").disabled = true;
  document.getElementById("cc-cvc").disabled = true;
  document.getElementById("cc-t").disabled = true;
  document.getElementById("cc-number1").disabled = false;
  document.getElementById("monto").disabled = false;
  document.getElementById("banco").disabled = false;
  document.getElementById("cc-t2").disabled = false;
});

function remove(i){
  cartProducts.splice(i, 1);
  productsCart(cartProducts);
      sumar();
}