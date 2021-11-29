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
                 <!-- Contenedor Principal -->
	<div class="comments-container">
  <ul id="comments-list" class="comments-list">
    <li>
      <div class="comment-main-level">
        <!-- Avatar -->
        <div class="comment-avatar"><img src="img/avataruser.jpg" alt=""></div>
        <!-- Contenedor del Comentario -->
        <div class="comment-box">
          <div class="comment-head">
            <h6 class="comment-name by-author"><a> ${data.user} ${showScore(data.score)}</a></h6>
            <span>${data.dateTime}</span>
            <i class="fa fa-reply"></i>
            <i class="fa fa-heart"></i>
          </div>
          <div class="comment-content">
          ${data.description}
						</div>
    </li>
  </ul>
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
	let perfil = JSON.parse(localStorage.getItem('usuario'));
  let name = perfil.nombre;
	let newCommentData = {
		"description": comment,
		"user": name,
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

