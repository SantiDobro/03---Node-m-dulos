//Ej01
const fs = require("fs");
const datos = fs.readFileSync("productos.json", "utf-8");
const productos = JSON.parse(datos);
const dayjs = require("dayjs");

// EJ02
function agregarProducto(nombre, precio) {
    let productos = [];

    try {
        let data = fs.readFileSync("productos.json", "utf-8");
        productos = JSON.parse(data);
    } catch (error) {
        productos = [];
    }

    let nuevoProducto = { nombre, precio };
    productos.push(nuevoProducto);

    fs.writeFileSync("productos.json", JSON.stringify(productos, null, 2));
}


agregarProducto("Monitor", 120000);


//Ej03

function mostrarFechaHora() {
  const ahora = dayjs();

  const fecha = ahora.format("DD/MM/YYYY");
  const hora = ahora.format("HH:mm");

  console.log("Fecha actual:", fecha);
  console.log("Hora actual:", hora);
}

mostrarFechaHora()


//Ej04



const axios = require("axios");

async function obtenerUsuario(id) {
  try {
    const url = "https://jsonplaceholder.typicode.com" + id;
    const respuesta = await axios.get(url);
    const usuario = respuesta.data;

    console.log("\n--- Datos del Usuario ---");
    console.log("Nombre:", usuario.name);
    console.log("Email:", usuario.email);
  } catch (error) {
    console.log("Error de conexión:", error.message);
  }
}

//Ej05

function buscarProducto(nombreABuscar) {
  try {
  
    const contenido = fs.readFileSync("productos.json", "utf-8");
    const listaProductos = JSON.parse(contenido);

    
    const encontrado = listaProductos.find(
      (p) => p.nombre.toLowerCase() === nombreABuscar.toLowerCase()
    );

    if (encontrado) {
      console.log("\nProducto encontrado");
      console.log("Nombre:", encontrado.nombre);
      console.log("Precio:", encontrado.precio);
    } else {
      console.log("\nProducto no encontrado");
    }
  } catch (error) {
    console.log("Error al leer el archivo:", error.message);
  }
}

//Ej06

function generarCSV() {
  try {

    const datos = fs.readFileSync("productos.json", "utf-8");
    const productos = JSON.parse(datos);

    let contenidoCSV = "nombre,precio\n";

    
    productos.forEach(producto => {
      contenidoCSV += `${producto.nombre},${producto.precio}\n`;
    });

   
    fs.writeFileSync("productos.csv", contenidoCSV);

    console.log("Archivo 'productos.csv' generado con éxito.");
  } catch (error) {
    console.log("Error al generar el CSV:", error.message);
  }
}

//Ej07

function iniciarContador() {
  let contador = 1;

  const intervalo = setInterval(() => {
    console.log(contador);

    if (contador === 10) {
      clearInterval(intervalo);
      
      setTimeout(() => {
        console.log("Fin del contador");
      }, 100); 
    }

    contador++;
  }, 1000);
}

//Ej08

function analizarTexto(texto) {

  const caracteres = texto.length;

  const palabras = texto.trim() === "" ? 0 : texto.trim().split(/\s+/).length;


  const vocales = (texto.match(/[aeiouáéíóúü]/gi) || []).length;

  const consonantes = (texto.match(/[bcdfghjklmnñpqrstvwxyz]/gi) || []).length;

  const resultado = {
    caracteres,
    palabras,
    vocales,
    consonantes
  };

  console.log(resultado);
  return resultado;
}

//Ej09

function validarPassword(password) {
  const tieneLargoSuficiente = password.length >= 8;
  
  const tieneNumero = /\d/.test(password);
  
  const tieneMayuscula = /[A-Z]/.test(password);

  if (tieneLargoSuficiente && tieneNumero && tieneMayuscula) {
    console.log("Password válida");
  } else {
    console.log("Password inválida");
  }
}


//Funcion para ejecutar todas las ejercitaciones
async function main() {
  mostrarFechaHora();

  agregarProducto("Monitor", 120000);

  console.log("\n--- Datos del país ---");
await obtenerUsuario(1);

buscarProducto("Monitor")
buscarProducto("Camara");

generarCSV();

iniciarContador();

analizarTexto("Hola mundo");

validarPassword("Hola1234"); 
validarPassword("hola123"); 
validarPassword("HOLA MUNDO"); 
}

main();