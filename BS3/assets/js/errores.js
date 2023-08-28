function alertaError(mensaje) {
    Swal.fire({
        icon: 'warning', // Cambia a 'warning', 'error', etc. 
        title: 'Atención',
        text: mensaje,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'swal2-confirm custom-color' //clase personalizada 
        }
    });
}

function alertaErrorRedireccionar(mensaje, url) {
    Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: mensaje,
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'swal2-confirm custom-color' //clase personalizada 
        }
    }).then(() => {
        window.location.href = url;
    });
}