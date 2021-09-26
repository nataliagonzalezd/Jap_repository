let productArray = [];
let products = [];
let commentArray = [];

function showproducts(array){
    
    let htmlContentToAppend = "";

    for(let data of array){

      let relatedProduct = productArray[data];
      
      htmlContentToAppend += `
			<div class="card mr-3" style="width: 18rem;">
  					<img src="${relatedProduct.imgSrc}" class="card-img-top">
  				<div class="card-body">
    				<h5 class="card-title">${relatedProduct.name}</h5>
    				<p class="card-text">${relatedProduct.description}</p>
  				</div>
  				<div class="card-body">
    				<a href="#" class="card-link">Ver Producto</a>
  				</div>
			</div>
		`;

    }

    document.getElementById("productRelated").innerHTML = htmlContentToAppend;
}

function sendComments(array){
    let htmlContentToAppend = "";

    for (let data of array){
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3 d-flex align-items-center">
                <img src='img/avataruser.jpg' class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h6 class="font-weight-bold margin-score">${data.user} ${showScore(data.score)}</h6>
                        <p>${data.description}</p>
                    </div>
                    <small class="text-muted">${data.dateTime}</small>
                </div>
            </div>
        </div>
    </div>
        `
        document.getElementById("coments").innerHTML = htmlContentToAppend;
    }
}

function showScore(score) {
	let stars = "";

	for (var i = 0; i < score; i++) {
		stars += `
			<span class="star-fill">★</span>
		`;
	}
	return stars;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

     getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProduct = resultObj.data;
          
            var name = document.getElementById("productName");
            var description = document.getElementById("productDescription");
            var productCost = document.getElementById("productCost");
            var category = document.getElementById("category");
            var soldCount = document.getElementById("soldcount")
            
            name.innerHTML = infoProduct.name;
            description.innerHTML = infoProduct.description;
            productCost.innerHTML = infoProduct.currency + " " + infoProduct.cost ;
            category.innerHTML = infoProduct.category;
            soldCount.innerHTML = infoProduct.soldCount;
        }
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productArray = resultObj.data;
              
                showproducts(infoProduct.relatedProducts);
            }
        });
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentArray = resultObj.data;
            sendComments(commentArray);
        }
    });
    
});
