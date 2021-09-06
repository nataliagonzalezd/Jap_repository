const ORDER_ASC_BY_COST = "Costup";
const ORDER_DESC_BY_COST = "Costdown";
const ORDER_BY_PROD_COUNT = "Rel.";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var search = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

const url= "https://japdevdep.github.io/ecommerce-api/product/all.json"
async function ProductosJSON(url,criteria){
let promise = await fetch(url);
let array = await promise.json();

array= sortProducts(criteria,array)


let contenido= "";
for (let index = 0; index < array.length; index++) {
    let name=array[index].name;
    let description= array[index].description;
    let cost= array[index].cost;
    let currency= array[index].currency;
    let img= array[index].imgSrc;
    let sc= array[index].soldCount;

    if (((minCount == undefined) || (minCount != undefined && parseInt(cost) >= minCount)) &&
           ((maxCount == undefined) || (maxCount != undefined && parseInt(cost) <= maxCount))){
            if (search == undefined || name.toLowerCase().indexOf(search) != -1 ||
                description.toLowerCase().indexOf(search) != -1) {

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
}}
}

document.getElementById("product-list-container").innerHTML = contenido;
}

 ProductosJSON(url,ORDER_ASC_BY_COST);

 document.getElementById("sortAsc").addEventListener("click", function(){
    ProductosJSON(url,ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    ProductosJSON(url,ORDER_DESC_BY_COST);
});

document.getElementById("sortByCount").addEventListener("click", function(){
    ProductosJSON(url,ORDER_BY_PROD_COUNT);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    ProductosJSON(url,ORDER_ASC_BY_COST);
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){

    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    ProductosJSON(url,ORDER_ASC_BY_COST);
});

document.getElementById("search").addEventListener("input", function (e) {
    search = document.getElementById("search").value.toLowerCase();
    ProductosJSON(url,ORDER_ASC_BY_COST);
});

