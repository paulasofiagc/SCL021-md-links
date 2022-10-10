#!/usr/bin/env node
const {
    rutExist,
  convertAbsolutePath,
} = require("./functionbase.js");

const link = process.argv[2];
const routeCheck = convertAbsolutePath(link);
const mdLinks = () => {
  return new Promise((resolve, reject) => {
    if (rutExist(link) == false) {
      reject("Ruta inválida! 😦");
    } else {
      routeCheck;
    }
  });
};

mdLinks();
