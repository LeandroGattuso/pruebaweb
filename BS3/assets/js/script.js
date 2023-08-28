//ejecutar en http://127.0.0.1:5500/index.html
//abrir el index.html con click derecho "open with live server"


//POST
const ItsPOST = async (config) => {
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(config),
    }
    let response = await fetch('http://iserver.itris.com.ar:5701/v1/auth', options)
    let data = await response.json();
    
    //console.log(data.error);

    return data.access_token;         
}

//validar acceso a la api, usuario y pass
const validarLogin = async () => {

    var usuario = document.getElementById("user").value;
    var contrasenia = document.getElementById("pass").value;

    //Indicadores Web (interna)
    let config = {
        app: '39',
        config: '194', //DEMO_POS
        username: usuario,  //INDI_WEB
        password: contrasenia  //sv4583
    }

    try {
        let token = await ItsPOST(config); // Obtenemos el token
        if (token === undefined)
            alertaError('Usuario y/o contraseña inválidos');
        else {   
            // almacena el token en Session Storage
            sessionStorage.setItem("token", token);

            //guardar el nombre de usuario
            sessionStorage.setItem("usuario", usuario);

            var url = "BS3/inicio.html";
            window.location.href = url;
        }
    } catch (error) {
        console.error(error);
    }
}


//Boton de ingreso
function login(){

    validarLogin();
}


