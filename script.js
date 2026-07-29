// ======================================
// JOYERÍA PERLITA
// SCRIPT PRINCIPAL
// ======================================

// Precio de la onza y del gramo
let onzaUSD = 0;
let gramoUSD = 0;

// ======================================
// OBTENER PRECIO DEL ORO
// ======================================

async function obtenerPrecioOro() {

    try {

        const respuesta = await fetch("https://api.gold-api.com/price/XAU");

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el precio del oro.");
        }

        const datos = await respuesta.json();

        // Precio de la onza troy en dólares
        onzaUSD = Number(datos.price);

        // Conversión a gramos
        gramoUSD = onzaUSD / 31.1034768;

        // Mostrar valores
        document.getElementById("onzaCompra").value = "$ " + onzaUSD.toFixed(2);
        document.getElementById("onzaVenta").value = "$ " + onzaUSD.toFixed(2);

        document.getElementById("gramoCompra").value = "$ " + gramoUSD.toFixed(2);
        document.getElementById("gramoVenta").value = "$ " + gramoUSD.toFixed(2);

        calcularCompra();
        calcularVenta();

    } catch (error) {

        console.error(error);

        document.getElementById("onzaCompra").value = "Error";
        document.getElementById("onzaVenta").value = "Error";

        document.getElementById("gramoCompra").value = "Error";
        document.getElementById("gramoVenta").value = "Error";

    }

}

// ======================================
// CALCULADORA DE COMPRA
// ======================================

function calcularCompra(){

let dolar=parseFloat(document.getElementById("dolarCompra").value)||0;

let pureza=parseFloat(document.getElementById("purezaCompra").value)||0;

let gramos=parseFloat(document.getElementById("gramosCompra").value)||0;

// Precio del oro puro (100%)

let oroPuro=gramoUSD*dolar;

// Aplicar pureza

let precioGramo=oroPuro*(pureza/100);

// Total

let total=precioGramo*gramos;

document.getElementById("precioGramoCompra").value=
precioGramo.toFixed(2)+" Bs";

document.getElementById("totalCompra").value=
total.toFixed(2)+" Bs";

}

// ======================================
// CALCULADORA DE VENTA
// ======================================

function calcularVenta(){

let dolar=parseFloat(document.getElementById("dolarVenta").value)||0;

let pureza=parseFloat(document.getElementById("purezaVenta").value)||0;

let gramos=parseFloat(document.getElementById("gramosVenta").value)||0;

let oroPuro=gramoUSD*dolar;

let precioGramo=oroPuro*(pureza/100);

let total=precioGramo*gramos;

document.getElementById("precioGramoVenta").value=
precioGramo.toFixed(2)+" Bs";

document.getElementById("totalVenta").value=
total.toFixed(2)+" Bs";

}

// ======================================
// EVENTOS
// ======================================

const compra=[

"dolarCompra",
"purezaCompra",
"gramosCompra"

];

compra.forEach(id => {

    document.getElementById(id).addEventListener("input", calcularCompra);

});

const venta=[

"dolarVenta",
"purezaVenta",
"gramosVenta"

];

venta.forEach(id => {

    document.getElementById(id).addEventListener("input", calcularVenta);

});

// ======================================
// INICIO
// ======================================

obtenerPrecioOro();

// Actualiza el precio automáticamente cada minuto

setInterval(obtenerPrecioOro, 60000);