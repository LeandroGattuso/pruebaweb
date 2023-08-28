/*
$(document).ready(function() {
    $('#tblListInt').DataTable();
});
*/
/*
$(document).ready(function() {
    $('#tblListInt').DataTable({
        
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior",
                // ... otros botones ...
            },
            "sSearch": "Buscar...",
            "sProcessing": "Procesando...",
            // ... más configuraciones ...
        }
        // ... otras opciones de configuración ...        
    });
});
*/
// Función genérica para configurar una tabla de DataTables
function configEstiloDataTable(tableId) {
//console.log('#'+tableId+'');
//$('#'+tableId+'').DataTable({
    
    $(`#${tableId}`).DataTable({
    
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior",
                // ... otros botones ...
            },
            "sSearch": "Buscar...",
            "sProcessing": "Procesando...",
            // ... más configuraciones ...
        }
        // ... otras opciones de configuración ...  
    });
}