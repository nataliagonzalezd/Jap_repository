document.addEventListener("DOMContentLoaded",function(e){
    
      function userValidator(){
        if (localStorage.length === 0){
            window.location = "login.html";
        }
    }

    userValidator();

    function showUserName(){
        let showUser = document.getElementById("show");
        let dataName = localStorage.getItem("usuario");
        showUser.innerHTML = dataName;
     }

     showUserName();

     function showMail(){
         let showMail = document.getElementById("mail");
         let mail = localStorage.getItem("Email");
         showMail.innerHTML = mail;
     }

     showMail();

     function showName(){
         let showName = document.getElementById("name");
         let name = localStorage.getItem("Nombre Completo");
         showName.innerHTML= name;
     }

     showName();
});

