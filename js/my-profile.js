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