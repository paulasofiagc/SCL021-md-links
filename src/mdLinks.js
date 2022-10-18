#!/usr/bin/env node
const {argv} = require('yargs');
const fs = require('fs');
const path = require('path');
const colors = require("colors");
const [, , , ...args] = process.argv
const route = process.argv[2];

const {
  readingDirectory, returnUrl
} = require('./index');
const {
  routeExists,
  checkAbsolutePath,
  transformToAbsolute,
  isDirectory,
  mdFile,
} = require("./functionbase");

if (routeExists(route)) {
  checkAbsolutePath(route) ? isDirectory(route) : transformToAbsolute(route);
  if (isDirectory(route)) {
    console.log("isDirectory")
    readingDirectory(route);
  } else {
    console.log("No es directorio")
    console.log(mdFile(route))
      if (mdFile(route)) {
        if (args.includes("--validate" && "--stats")) {
          console.log('opcion validate y stats');
        } else if (args.includes("--validate")) {
          returnUrl(route)
          console.log('opcion validate');
        } else if (argv.stats) {
          console.log('opcion stats');
        } 
      } else {
          console.log('El archivo no es Markdown 🤔')
      }
  }
} else {
  console.log('Oh no! el archivo no existe 😑')
}
