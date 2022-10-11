const readline = require("readline");
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const {
  routeExists,
  checkAbsolutePath,
  transformToAbsolute,
  isDirectory,
} = require("./functionbase");

const getInput = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

getInput.question("Ingresa tu ruta:", (route) => {
  if (routeExists(route)) {
    checkAbsolutePath(route) ? isDirectory(route) : transformToAbsolute(route);
  } else {
    process.stdout.write("El archivo que ingresaste no existe 😪 Presiona CTRL+C y vuelve a iniciar");
  }
});
