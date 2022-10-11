//file system
const fs = require("fs");
const path = require("path");
// Ver si la ruta existe
const routeExists = (route) => fs.existsSync(route);
//Ver si una ruta es relativa
const checkAbsolutePath = (route) => path.isAbsolute(route);
/* console.log(path.isAbsolute("/rutescan/prueba.md"));
console.log(path.isAbsolute("rutescan/tengolinks.md"));
console.log(path.isAbsolute("/rutescan/soyjs.js")); */

// Transformar la ruta a absoluta
const transformToAbsolute = (route) => path.resolve(route);
//se utiliza para devolver información sobre la ruta del archivo dada de forma síncrona
const isDirectory = (route) =>{
    const statsFile = fs.statSync(route);
    if (statsFile.isDirectory()){
        process.stdout.write("El archivo es directorio! 🥰")
    }else  {
        mdFile(route)
    }
    };
/* const isDirectory = (route) => fs.statSync(route).isDirectory(route);
 */
//Saber si archivo es md o no
    const mdFile= (route) => {
        var ext = path.extname(route);
        if(ext === ".md"){
            process.stdout.write('Bingo el archivo es Markdown! ') 
        } else{
            process.stdout.write('No puede ser! 😣 No tengo extensión md') 
        }
    };
module.exports = {
    routeExists,
    checkAbsolutePath,
    transformToAbsolute,
    isDirectory
};
