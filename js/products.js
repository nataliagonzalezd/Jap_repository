//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

const url= "https://japdevdep.github.io/ecommerce-api/product/all.json"
async function ProductosJSON(url){
let promise = await fetch(url);
let array = await promise.json();

let contenido= "";
for (let index = 0; index < array.length; index++) {
    let name=array[index].name;
    let description= array[index].description;
    let cost= array[index].cost;
    let currency= array[index].currency;
    let img= array[index].imgSrc;
    let sc= array[index].soldCount;

    contenido +=`
    <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + img+ `" alt="` + description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ name +`</h4>
                    <small class="text-muted">` + sc + ` artículos vendidos</small>
                </div>
                <p class="mb-1">` + description + `</p>
                <p class="mb-1">`+"Costo:"+ " " + cost +" "+ currency + `</p>
            </div>
        </div>
    </a>
    `
}
document.getElementById("product-list-container").innerHTML = contenido;
}

 ProductosJSON(url);
