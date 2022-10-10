//file system
const fs = require("fs");
const path = require("path");

link = process.argv[2];
// Crea un input en consola para que cliente ingrese la ruta a evaluar
const getInput = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

getInput.question("Ingresa tu ruta:", (link) => {
  const rutExist = (link) =>
  fs.existsSync(link) === true
      ? console.log("Ruta ingresada es válida 😍")
      : console.log("Ruta no es válida 😥");
  console.log(rutExist(link));
  getInput.close();
});

const convertAbsolutePath = (link) => {
  if (path.isAbsolute(link) === true) {
    console.log("esto es ruta relativa " + path.resolve(link));
    return link;
  } else {
    return path.resolve(link);
  }
};
/* 
const validateRute = () => {
  let myPath = argv[2];
  if (path.isAbsolute(myPath)) {
    pathAbsolute = myPath;
  } else {
    pathAbsolute = path.resolve(myPath); //convierto la ruta en absoluta
  }
}; */

module.exports = {
  convertAbsolutePath, rutExist
};
