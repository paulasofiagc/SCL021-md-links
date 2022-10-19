/* const readline = require("readline"); */
const fs = require("fs");
const path = require("path");
const { argv } = require("yargs");
const colors = require("colors");
const url = require("url");
const https = require("https");
const { filterLinks } = require("./functionbase");
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
const RegExr = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\n\s]+)(?=\))/g;
const returnUrl = (files) => {
  fs.readFile(files, "utf-8", (err, files) => {
    console.log(files);
    const links = files.match(RegExr);
    console.log({ links });
    const newArray = Array.from(links);
    if (err) {
      console.log(err);
    } else {
      console.log(newArray);
    }
  });
};
const httpStatus = (route) => {
  return new Promise((resolve) => {
    const options = {
      method: "GET",
      host: url.parse(route).host,
      port: 443,
      path: url.parse(route).pathname,
    };
// https.request(options[, callback]) 
    const app = https.request(options, (res) => {
      const linkstatus = {
        linkname: route,
        Code: res.statusCode,
        status: res.statusCode,
      };
      resolve(linkstatus);
    });

    app.on("error", (error) => {
      const dataerr = {
        linkname: ruta,
        status: false,
      };
      resolve(dataerr);
    });

    app.end();
  });
};
const stats = (route) => {
  fs.readFile(route, "utf-8", (err, data) => {
    // entra al archivo
    const links = data.match(RegExr);
    let arrayStatus = Array.from(links);
    let brokenLinks = [];
    console.log("Total links:".bold.blue, links.length + "😎" );

    if (err) {
      console.log(err);
    } else {
      console.log("Links únicos🙄:".bold.magenta, filterLinks(arrayStatus));
    }
    links.map((url) => {
      httpStatus(url)
        .then((res) => {
          if (res.status >= 400) {
            brokenLinks.push(res.status);
          }
        })
        .catch((err) => {
          console.log(err.code);
        });
    });
    // console.log(data);
  });
};

const validate = (route) => {
  fs.readFile(route, "utf-8", (err, data) => {
    // entra al archivo
    const links = data.match(RegExr);
    let status = new Array();
    if (err) {
      console.log(err);
    } else {
      links.forEach((url) => {
        httpStatus(url)
          .then((res) => {
            if (res.status === 200) {
              console.log("El status de".green, url, "es", res.status, "Oki😍".green);
            } else if (res.status === 301) {
              console.log("El status de".green, url, "es", res.status, "Okey😎".green);
            } else if (res.status !== 200) {
              console.log("El status de".green, url, "es", res.status, "Error😓".red);
            }
          })
          .catch((err) => {
            console.log(err.code);
          });
      });
    }
  });
};


module.exports = {
  readingDirectory,
  returnUrl,
  httpStatus,
  validate,
  stats
};
