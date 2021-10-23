let productArray = [];
let products = [];
let commentArray = [];


function showproducts(array){
    
    let htmlContentToAppend = "";

    for(let data of array){

      let relatedProduct = productArray[data];
      
      htmlContentToAppend += `

            <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-5">
      <img src="${relatedProduct.imgSrc}" style="max-width:225px;" class="img-fluid rounded-start">
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <h5 class="card-title">${relatedProduct.name}</h5>
        <p class="card-text">${relatedProduct.description}</p>
      </div>
    </div>
    <p class="card-text"><small class="text-muted">Articulos vendidos: ${relatedProduct.soldCount}</small></p>
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
            <div class="col-1 d-flex align-items-center">
                <img src='img/avataruser.jpg' class="img-thumbnail">
            </div>
            <div class="col-8">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-3">
                        <h6 class="font-weight-bold margin-score">${data.user} ${showScore(data.score)}</h6>
                        <p>${data.description}</p>
                    </div>
                    <small class="text-muted">${data.dateTime}</small>
                </div>
            </div>
        </div>
    </div>
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
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
            var soldCount = document.getElementById("soldcount");
            
            name.innerHTML = infoProduct.name;
            description.innerHTML = infoProduct.description;
            productCost.innerHTML = infoProduct.currency + " " + infoProduct.cost ;
            category.innerHTML = infoProduct.category;
            soldCount.innerHTML = infoProduct.soldCount;
            showPics(infoProduct.images);
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

function newComment(){
	let comment = document.getElementById("newComment").value;
	
	let valueScore = document.getElementsByName("scores");
	let dataName = localStorage.getItem("usuario");
	let newCommentData = {
		"description": comment,
		"user": dataName,
		"dateTime": formatDate()
	};

    for (let value of valueScore) {
		if (value.checked) {
			newCommentData.score = value.value;
		}
	}

	commentArray.push(newCommentData);
	sendComments(commentArray);
}

function formatDate() {
	let date = new Date();

	if ((date.getMonth() + 1) < 12) {
		var month =  (date.getMonth() + 1);
	};
	if (date.getDate() < 32) {
		var day = date.getDate();
	};
	var fullDate = date.getFullYear() + '-' + month + '-' + day;
	var hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	var data = fullDate + ' ' + hour;

	return data;
}

function showPics(array){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){

      let pic= array[i];
      
      if(i==0){
      htmlContentToAppend += `
    <div class="carousel-item active">
      <img src="${pic}" class="d-block w-100" alt="...">
    </div>
		`;
    }else{
        htmlContentToAppend += `
    <div class="carousel-item">
      <img src="${pic}" class="d-block w-100" alt="...">
    </div>
		`;
    }
    
    }

    document.getElementById("showProductInfo").innerHTML = htmlContentToAppend;
    }

    function caption(array){

        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            
            let datas = array[i];
            
            htmlContentToAppend +=  `
            <h5 id="productName"></h5>
            <p id="productCost"></p>
      `;

        }
    document.getElementById(datas).innerHTML = htmlContentToAppend;
    }

