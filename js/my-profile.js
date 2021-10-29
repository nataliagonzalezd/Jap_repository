//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    $( document ).ready(function() {
        // Bounce button
        $("#animatebutton").click(function(){
        const element = document.querySelector('.animatebutton');
        element.classList.add('animated', 'tada');
        setTimeout(function() {
        element.classList.remove('tada');
        }, 1000);
        });
  
      });

  });


  document.getElementById("contactInput").style.display="none";
  document.getElementById("mailInput").style.display= "none";
  document.getElementById("ageInput").style.display= "none";
  document.getElementById("userInput").style.display="none";
  document.getElementById("ocupationInput").style.display="none";
  document.getElementById("saveDataButton").style.display="none";
  document.getElementById("newNameInput").style.display="none";
  document.getElementById("upload").style.display="none";


  function showHiddenInput(){
    document.getElementById("contactInput").style.display='block';
    document.getElementById("contact").style.display="none";
    document.getElementById("mailInput").style.display= "block";
    document.getElementById("mail").style.display="none";
    document.getElementById("ageInput").style.display="block";
    document.getElementById("age").style.display="none";
    document.getElementById("userInput").style.display="block";
    document.getElementById("newUser").style.display="none";
    document.getElementById("ocupationInput").style.display="block";
    document.getElementById("ocupation").style.display="none";
    document.getElementById("animatebutton").style.display="none";
    document.getElementById("saveDataButton").style.display="block";
    document.getElementById("newNameInput").style.display="block";
    document.getElementById("upload").style.display="block";
}

function upload() {
  let preview = document.getElementById('pic');
  let file    = document.querySelector('input[type=file]').files[0];
  let reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result; 
    document.getElementById('contenido').innerHTML= reader.result;
    
  }

  if (file) {
    reader.readAsDataURL(file);
   
  } else {
    preview.src = "img/avatar.png";
  }
}

document.getElementById("saveDataButton").addEventListener("click", function(){
  let preview = document.getElementById('pic');
  let perfil = {};

  perfil.nombre = document.getElementById('newNameInput').value 
  perfil.edad = document.getElementById('ageInput').value 
  perfil.usuario = document.getElementById("userInput").value;
  perfil.email = document.getElementById("mailInput").value;
  perfil.contacto = document.getElementById("contactInput").value;
  perfil.ocupacion = document.getElementById("ocupationInput").value;
  perfil.imagen = preview.src

  localStorage.setItem('usuario', JSON.stringify(perfil));
  alert ( "Perfil guardado")
  window.location = "my-profile.html";
});

document.addEventListener('DOMContentLoaded',()=>{
  let preview = document.getElementById('pic');
  let perfil = JSON.parse(localStorage.getItem('usuario'));
 
  if (perfil != null){
      

    document.getElementById('newNameInput').value = perfil.nombre;
    document.getElementById('ageInput').value= perfil.edad;
    document.getElementById("mailInput").value= perfil.email;
    document.getElementById("userInput").value= perfil.usuario;
    document.getElementById("contactInput").value= perfil.contacto;
    document.getElementById("ocupationInput").value= perfil.ocupacion;
    document.getElementById('pic').src = perfil.imagen;

  }else {
    preview.src = "img/avatar.png";
  }
 

})