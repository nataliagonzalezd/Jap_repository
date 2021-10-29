document.addEventListener("DOMContentLoaded",function(e){
    
      function userValidator(){
        if (localStorage.length === 0){
            window.location = "login.html";
        }
    }

    userValidator();

    function showUserName(){
        let showUser = document.getElementById("show");
        let perfil = JSON.parse(localStorage.getItem('usuario'));
        let dataName = perfil.usuario;
        showUser.innerHTML = dataName;
     }

     showUserName();

     function showMail(){
         let showMail = document.getElementById("mail");
         let perfil = JSON.parse(localStorage.getItem('usuario'));
         let mail = perfil.email;
         showMail.innerHTML = mail;
     }

     showMail();

     function showName(){
         let showName = document.getElementById("name");
         let perfil = JSON.parse(localStorage.getItem('usuario'));
         let name = perfil.nombre;
         showName.innerHTML= name;
     }

     showName();

     function showOcupation(){
         let showOc = document.getElementById("ocupation");
         let perfil = JSON.parse(localStorage.getItem('usuario'));
         let ocupation = perfil.ocupacion;
         showOc.innerHTML = ocupation;

     }

     showOcupation();

     function showContact(){
         let showCon = document.getElementById("contact");
         let perfil = JSON.parse(localStorage.getItem('usuario'));
         let contact = perfil.contacto;
         showCon.innerHTML = contact;

     }

     showContact();

     function showAge(){
         let showAge = document.getElementById("age");
         let perfil = JSON.parse(localStorage.getItem('usuario'));
         let age = perfil.edad;
         showAge.innerHTML = age;

     }

     showAge();

     function showUser(){
         let showUser = document.getElementById("newUser");
         let perfil = JSON.parse(localStorage.getItem('usuario'));
         let user = perfil.usuario;
         showUser.innerHTML= user;

     }

     showUser();
});

