/* const readline = require("readline"); */
const fs = require("fs");
const path = require("path");
const { argv } = require("yargs");
const colors = require("colors");
const url = require("url");
const https = require("https");
//tercer argumento en consola
let route = process.argv[2];

// El método fs.readdir() se utiliza para leer de forma asíncrona el contenido de un directorio determinado. La devolución de llamada de este método devuelve una matriz de todos los nombres de archivo en el directorio.
const readingDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.readdir(route, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(
          data.forEach((files) => {
            if (path.extname(files) === ".md") {
              return console.log(files);
            }
          })
        );
      }
    });
  });
};
const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g;
const returnUrl = (files) => {
  fs.readFile(files, "utf-8", (err, files) => {
    console.log(files);
    const links = files.match(RegExr);
    console.log({links})
    const newArray = Array.from(links);
    if (err) {
      console.log(err);
    } else {
      console.log(newArray);
    }
  });
};
const validateUrls = (ruta) => {
  fs.readFile(ruta, "utf-8", (err, data) => { // entra al archivo
      const stringLinks = data.match(RegExr);
      let arrayStatus = new Array();
      if (err) {
          console.log(err);
      } else {
          stringLinks.forEach((urlData) => {
              getHttpStatus(urlData)
              .then((res) => {
                if (res.status === 200) {
                console.log('Status from', urlData, 'is', res.status, 'OK ✓');
                } else if (res.status === 301) {
                  console.log('Status from', urlData, 'is', res.status, 'OK ✓');
                } else if (res.status !== 200) {
                console.log('Status from', urlData, 'is', res.status, 'FAIL ✕');
                }
              })
              .catch((err) => {
                console.log(err.code);
              });
      });
      }
  });
}
// obtener links
/* const validate = (route) =>{
  fs.readFile(route, "utf-8", (err, data) => {
    const links = data.match(RegExr);
  } */


module.exports = {
  readingDirectory,
  returnUrl
};
