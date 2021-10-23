var login_register= document.querySelector(".login-register")
var form_register= document.querySelector(".form-register")
var form_login= document.querySelector(".form-login")
var back_box_register= document.querySelector(".back-box-register")
var back_box_login= document.querySelector(".back-box-login")

document.addEventListener("DOMContentLoaded", function(e){
    

    function register(){

        if(window.innerWidth >850){
        form_register.style.display= "block";
        login_register.style.left= "410px";
        form_login.style.display= "none";
        back_box_register.style.opacity="0";
        back_box_login.style.opacity="1"
    }else{
        form_register.style.display= "none";
        login_register.style.left= "0px";
        form_login.style.display= "none";
        back_box_register.style.display="none";
        back_box_login.style.display="block";
        back_box_login.style.opacity="1";

    }
    }

    function login(){
        if(window.innerWidth > 850){
        form_register.style.display= "none";
        login_register.style.left= "10px";
        form_login.style.display= "block";
        back_box_register.style.opacity="1";
        back_box_login.style.opacity="0";
    }else{
        form_register.style.display= "none";
        login_register.style.left= "0px";
        form_login.style.display= "block";
        back_box_register.style.display="block";
        back_box_login.style.display="none";
       }
    
    }

    function widthpage(){
        if(window.innerWidth > 850){
            back_box_login.style.display= "block";
            back_box_register.style.display= "block";
        }else{
            back_box_register.style.display= "block";
            back_box_register.style.opacity="1";
            back_box_login.style.display="none"
            form_login.style.display="block";
            form_register.style.display="none";
            login_register.style.left="0px"
        }
    }
    
    widthpage();
    
    document.getElementById("f-register").addEventListener("click",register);
    document.getElementById("f-login").addEventListener("click",login);
    window.addEventListener("resize",widthpage)
});


    document.getElementById("register").addEventListener("click", function(){
    let name = document.getElementById("name").value;
    let newUser = document.getElementById("newUser").value;
    let newPsw = document.getElementById("newPsw").value;
    let mail = document.getElementById("mail").value;
    if((mail.trim() != "") ||  (newUser.trim() != "") || (newPsw.trim() != "" || (name.trim() != ""))){
        localStorage.setItem("Nombre Completo", name);
        localStorage.setItem("Nuevo usuario", newUser);
        localStorage.setItem("Nueva contraseña", newPsw);
        localStorage.setItem("Email", mail);
        if (((localStorage.getItem("Nombre Completo") != "") && localStorage.getItem("Nuevo usuario") != "") && (localStorage.getItem("Nueva contraseña") != "") && (localStorage.getItem("Email") != "")){
                 alert("Se ha registrado exitosamente, por favor, inicie sesion");
                  }else{
                     alert("Por favor, complete los campos requeridos");
                 }
    }
});

    function complete(){
        
        let userName = document.getElementById("user").value;
        let psw = document.getElementById("psw").value;
        if((userName.trim() != "") ||  (psw.trim() != "")){
            localStorage.setItem("usuario", userName);
            localStorage.setItem("contraseña", psw);}
    
      if(localStorage.getItem("Nuevo usuario")===localStorage.getItem("usuario") & (localStorage.getItem("contraseña")===localStorage.getItem("Nueva contraseña"))){
          window.location = "index.html";
      }else{ window.location = "login.html";
      alert("El nombre de usuario o contrasena son incorrectos");
      localStorage.removeItem("contraseña") & localStorage.removeItem("usuario")
      }
           
    }

    function logout(){
        localStorage.removeItem("usuario");
        localStorage.removeItem("contraseña");
    }