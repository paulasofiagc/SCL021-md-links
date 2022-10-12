/* const readline = require("readline"); */
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const {
  routeExists,
  checkAbsolutePath,
  transformToAbsolute,
  isDirectory,
  mdFile,
} = require("./functionbase");
let route = process.argv[2];

/* const getInformation = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

getInformation.question("Ingresa tu ruta:", (route) => {
  if (routeExists(route)) {
    checkAbsolutePath(route) ? isDirectory(route) : transformToAbsolute(route);
  } else {
    process.stdout.write("El archivo que ingresaste no existe 😪 Presiona CTRL+C y vuelve a iniciar");
  }
});
 */
// El método fs.readdir() se utiliza para leer de forma asíncrona el contenido de un directorio determinado. La devolución de llamada de este método devuelve una matriz de todos los nombres de archivo en el directorio.
const readingDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.readdir(route, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(
          data.forEach((file) => {
            if (path.extname(file) === ".md") {
              return console.log(file);
            }
          })
        );
      }
    });
  });
};
// obtener links
if (routeExists(route)) {
  checkAbsolutePath(route) ? isDirectory(route) : transformToAbsolute(route);
}
if (isDirectory(route)) {
  readingDirectory(route);
} else {
  if (mdFile(route)) {
    console.log("Soy archivo Markdown 🥰".green);
  } else {
    console.log("No puede ser 😦, no es archivo Markdown".red);
  }
}
