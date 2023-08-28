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
    }
};

const initDataTable = async () => {
    if (!dataTableIsInitialized) { // Verifica si ya se inicializó el DataTable
        if (dataTable) {
            dataTable.destroy(); // Destruye el DataTable existente si lo hay
        }

        dataTable = $("#tblVenSucConVen").DataTable(dataTableOptions);

        dataTableIsInitialized = true;
    }
};

//FIN ***************************************************************************** */
//http://iserver.itris.com.ar:5701/v1/class/_VEN_SUC?limit=-1&sqlFilter=FK_ERP_SUCURSALES=3
const URL = 'http://iserver.itris.com.ar:5701/v1/class/_VEN_SUC?limit=-1';


function calcular(){
    
    const fechaDesde = document.getElementById("fechaDesde").value;
    const fechaHasta = document.getElementById("fechaHasta").value;
    
    // Verifica si ambas fechas tienen valor
    if (fechaDesde && fechaHasta) {
        console.log("Fecha Desde:", fechaDesde);
        console.log("Fecha Hasta:", fechaHasta);

        //mainFunc("http://iserver.itris.com.ar:5701/v1/class/_VEN_SUC?limit=-1&sqlFilter=FK_ERP_SUCURSALES=3");        

    } else {
        console.log("Por favor, selecciona ambas fechas.");
    }
    
}

//GET
const ItsGETVenSucCond = async (URL_2,token) => {
    
    let options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // aca agregamos el token en los headers
            "Content-type": "application/json"
        }
    }
    let response = await fetch(URL_2, options)    
    let data = await response.json();    
    
    return data;
}

const mainFunc = async (URL_2) => {
    
    console.log(URL_2);

    // Obtener el valor del usuario
    const ftusuario = sessionStorage.getItem("usuario");  
    const ftUserLink = document.getElementById("ftUser");
    ftUserLink.textContent = "Usuario: " + ftusuario;

    // Obtener el valor del token
    const token = sessionStorage.getItem("token");    

    try {
        //console.log(token);
        let dsLista = await ItsGETVenSucCond(URL_2,token); // Hacemos la petición GET utilizando el token
        //console.log(dsLista.error);
        //controlar si exiró el token, devolver mensaje de error        
        
        if (dsLista.error != 'undefined' && dsLista.error != 'not_found'){

            let dsListaIntegral = dsLista.data; 
        
            //llenar la grilla de lista integral
            let tablaListInte =  ``;
            dsListaIntegral.forEach((item) => {
            
                tablaListInte += `<tr>
                <td>${item.Z_FK_ERP_SUCURSALES}</td>
                <td>${item.Z_FK_ERP_ASESORES}</td>
                <td>${item.Z_FK_ERP_CON_VEN}</td>
                <td>${item.IMP_TOTAL}</td>                 
                </tr>`;
            });
        
            // Ocultar el mensaje de "Cargando..." y llenar la tabla con los datos
            //document.getElementById("loadingRow2").style.display = "none";

            document.getElementById("tbl_VEN_SUC").innerHTML = tablaListInte;
            
            //ver
            if (!dataTableIsInitialized) {
                initDataTable();
            }

            // Llamar a calcular() después de que mainFunc haya completado
            //calcular();

        }
        else{
            alertaErrorRedireccionar("La sesión expiró", "/index.html");           
        }

    } catch (error) {
        console.error(error);
    }
}


//inicio funcion principal

// Ejecuta mainFunc al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    mainFunc(URL).then(() => {
        // Llama a initDataTable después de que mainFunc haya completado
        initDataTable();
    });
});








