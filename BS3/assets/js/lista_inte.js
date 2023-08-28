//CONFIGURACION DATA TABLE ***************************************************************************** */
let dataTable = null;
let dataTableIsInitialized = false;

const dataTableOptions = {

    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún registro encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún registro encontrado",
        infoFiltered: "(filtrados de _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    },
    columnDefs: [
        { type: 'formatted-num', targets: 5 }
      ]

};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await mainFunc();

    dataTable = $("#tblListInt").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};
//FIN ***************************************************************************** */


const URL = 'http://iserver.itris.com.ar:5701/v1/class/ERP_ART_BUS_POS?limit=5000';

//GET
const ItsGETListaIntegral = async (token) => {
    let options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // aca agregamos el token en los headers
            "Content-type": "application/json"
        }
    }
    
    let response = await fetch(URL, options)        
    let data = await response.json();        
    
    return data;
}

const mainFunc = async () => {
    
    // Obtener el valor del usuario
    const ftusuario = sessionStorage.getItem("usuario");  
    const ftUserLink = document.getElementById("ftUser");
    ftUserLink.textContent = "Usuario: " + ftusuario;

    // Obtener el valor del token
    const token = sessionStorage.getItem("token");    

    try {
        //console.log(token);
        let dsLista = await ItsGETListaIntegral(token); // Hacemos la petición GET utilizando el token        
        //controlar si exiró el token, devolver mensaje de error        
        
        if (dsLista.error != 'undefined' && dsLista.error != 'not_found'){
            
            let dsListaIntegral = dsLista.data; 
        
            //llenar la grilla de lista integral
            let tablaListInte =  ``;
            dsListaIntegral.forEach((item) => {
            
                tablaListInte += `<tr>
                <td>${item.ID}</td>
                <td>${item.DESCRIPCION}</td>
                <td>${item.Z_FK_ERP_AGR_ART}</td>
                <td>${item.Z_FK_ERP_MARCAS}</td>
                <td>${item.PRECIO}</td> 
                <td>${item.STOCK_DEPOSITO}</td> 
                <td>${item.STOCK_SUCURSAL}</td>
                <td>${item.STOCK_TOTAL}</td>
                </tr>`;
            });
        
            // Ocultar el mensaje de "Cargando..." y llenar la tabla con los datos
            //document.getElementById("loadingRow").style.display = "none";

            document.getElementById("tblERP_ART_BUS_POS").innerHTML = tablaListInte;

        }
        else{
            alertaErrorRedireccionar("La sesión expiró", "/index.html");            
        }

    } catch (error) {
        console.error(error);
    }
}



//inicio funcion principal
mainFunc();

window.addEventListener("DOMContentLoaded", async () => {    
    await initDataTable(); 
});


