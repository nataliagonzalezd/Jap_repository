let perfil = {};
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

document.getElementById("valid").style.display="none";
      
function registro(){
        
        perfil.nombre = document.getElementById('name').value;
        perfil.nuevoUsuario = document.getElementById("newUser").value;
        perfil.email = document.getElementById("mail").value;
        perfil.nuevaContrasena= document.getElementById("newPsw").value;

        if(((perfil.nombre.trim() != "") && (perfil.nuevoUsuario.trim() != "")
        && (perfil.email.trim() != "") && (perfil.nuevaContrasena.trim() != ""))){
       
            localStorage.setItem('usuario', JSON.stringify(perfil)); 
             }else{
                document.getElementById("valid").style.display="block";
            } 
         
    };


document.addEventListener('DOMContentLoaded',()=>{
    let perfil = JSON.parse(localStorage.getItem('usuario'));
   
    if (perfil != null){
  
        document.getElementById("name").value = perfil.nombre;
        document.getElementById("newUser").value= perfil.nuevoUsuario;
        document.getElementById("mail").value = perfil.email;
        document.getElementById("newPsw").value = perfil.nuevaContrasena;
        document.getElementById("psw").value = perfil.contraseña;
        document.getElementById("user").value = perfil.usuario;
    } 
});

document.getElementById("validL").style.display="none";

    function complete(){
    
        itemObject = [];

        perfil.contraseña = document.getElementById("psw").value;
        perfil.usuario= document.getElementById("user").value;
        registro();
    
        itemObject.push(perfil);
        localStorage.setItem('usuario', JSON.stringify(perfil));

        if(((perfil.nuevoUsuario.trim() === perfil.usuario.trim()) && (perfil.nuevaContrasena.trim()===perfil.contraseña.trim()))){
            window.location = "index.html";
        }else{ window.location = "login.html" 
         document.getElementById("validL").style.display="block";
    }}
    
    
    function logout(){
        localStorage.removeItem(usuario);
    }