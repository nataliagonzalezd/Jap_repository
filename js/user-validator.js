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
});