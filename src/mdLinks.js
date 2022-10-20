#!/usr/bin/env nod
const fs = require("fs");
const path = require("path");
const colors = require("colors");
const [, , , ...args] = process.argv;
const route = process.argv[2];

const { readingDirectory, stats, validate } = require("./index");
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
    console.log("isDirectory");
    readingDirectory(route);
  } else {
    console.log("No es directorio 😨".underline.cyan);
    /* console.log(mdFile(route)) */
    if (mdFile(route)) {
      if (args.includes("--validate") && args.includes("--stats")) {
        console.log("Pusiste la opcion validate y stats".random);
        validate(route);
        stats(route);
      } else if (args.includes("--validate")) {
        console.log("Pusiste la opcion validate".underline.bold.blue);
        validate(route);
      } else if (args.includes("--stats")) {
        console.log("Pusiste la opcion stats");
        stats(route);
      }
    } else {
      console.log("El archivo no es Markdown 🤔");
    }
  }
} else {
  console.log("Oh no! el archivo no existe 😑");
}
