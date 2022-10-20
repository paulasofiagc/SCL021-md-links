//file system
const fs = require("fs");
const path = require("path");
const routeExists = (route) => fs.existsSync(route);
//Ver si una ruta es relativa
const checkAbsolutePath = (route) => path.isAbsolute(route);
// Transformar la ruta a absoluta
const transformToAbsolute = (route) => path.resolve(route);
//se utiliza para devolver información sobre la ruta del archivo dada de forma síncrona
const isDirectory = (route) => fs.statSync(route).isDirectory(route);
// Para filtrar el largo de array
const filterLinks = (links) =>
  links.filter((a, i, e) => e.indexOf(a) === i).length;
// Para saber si tiene extensión md
const mdFile = (route) => path.extname(route) === ".md";

module.exports = {
  routeExists,
  checkAbsolutePath,
  transformToAbsolute,
  isDirectory,
  mdFile,
  filterLinks,
};
