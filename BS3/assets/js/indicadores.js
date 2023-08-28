// ---------- CHARTS ----------

// GRAFICO DE BARRAS
var barChartOptions = {
    series: [{
      data: [10, 100, 6, 40, 20]
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
    },
    colors: [
      "#246dec",
      "#cc3c43",
      "#367952",
      "#f5b74f",
      "#4f35a1"
    ],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: ["01-014-002", "TV 55 PHI", "COCINA 2123", "PARLANTE", "01-002-018/LAVARROPAS"],
    },
    yaxis: {
      title: {
        text: "Cantidad"
      }
    }
  };
  
  var barChart = new ApexCharts(document.querySelector("#bar_art_vend"), barChartOptions);
  barChart.render();
  
  //lg
  // GRAFICO DE BARRAS
  var barChartOptions_2 = {
    series: [{
      data: [50000, 100000, 60000, 400000, 200000]
    }],
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      },
    },
    colors: [
      "#246dec",
      "#cc3c43",
      "#367952",
      "#f5b74f",
      "#4f35a1"
    ],
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: ["Belén", "Cafayate", "Casa Central", "Aguilares", "Lachocha"],
    },
    yaxis: {
      title: {
        text: "Total"
      }
    }
  };
  var barChart_2 = new ApexCharts(document.querySelector("#bar_art_vend_2"), barChartOptions_2);
  barChart_2.render();
  
  
  // GRAFICO DE AREA
  var areaChartOptions = {
    series: [{
      name: 'Compras',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'Ventas',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#4f35a1", "#246dec"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth'
    },
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
    markers: {
      size: 0
    },
    yaxis: [
      {
        title: {
          text: 'COMPRAS',
        },
      },
      {
        opposite: true,
        title: {
          text: 'VENTAS',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    }
  };
  
  var areaChart = new ApexCharts(document.querySelector("#area_compras_ventas"), areaChartOptions);
  areaChart.render();
  
  //lg
  
  var areaChartOptions_2 = {
    series: [44, 55, 13, 43, 22],
            chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['EFECTIVO', 'CAJA DOLARES', 'CAJA DOLARES', 'GIFTCARD', 'TARJETAS'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
          };
  
  var areaChart_2 = new ApexCharts(document.querySelector("#area_compras_ventas_2"), areaChartOptions_2);
  areaChart_2.render();

  //**********************************************************************

const URL = 'http://iserver.itris.com.ar:5701/v1/class/ERP_ART_BUS_POS?limit=700';

function calcular(){
    const totVfechaDesdeentas = document.getElementById("fechaDesde").value;
    const fechaHasta = document.getElementById("fechaHasta").value;
    console.log(totVfechaDesdeentas);
    console.log(fechaHasta);
    
}

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

    calcular();

    //setear los totales en las card
    const totVentas = document.getElementById("totVentas");
    totVentas.textContent = "$15.546,500,65"; //poner resultado de la api

    const totCompras = document.getElementById("totCompras");
    totCompras.textContent = "$865,500,25"; //poner resultado de la api

    const totVenttotArtiatotArtis = document.getElementById("totArti");
    totArti.textContent = "7643"; //poner resultado de la api

    try {
        //console.log(token);
        let dsLista = await ItsGETListaIntegral(token); // Hacemos la petición GET utilizando el token        
        //controlar si exiró el token, devolver mensaje de error        
        
        if (dsLista.error != 'undefined' && dsLista.error != 'not_found'){
            
            let dsListaIntegral = dsLista.data; 
        
            //llenar la grilla de lista integral
            let tablaListInte =  ``;
            dsListaIntegral.forEach((item) => {
            
            });
        
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
