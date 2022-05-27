import { Contenedor } from "./contenedor.js";
import express from "express";
// const express = require("express");

// Create instance of Contenedor class
let product = new Contenedor("productos.txt");

// Create products on file
(async () => {
  console.log(await product.save({ title: "manzanas", price: 3.5 }));
  console.log(await product.save({ title: "bananas", price: 11.0 }));
  console.log(await product.save({ title: "peras", price: 15.0 }));
  console.log(await product.save({ title: "tomates", price: 13.0 }));
})();

// create closure
const app = express();
const PORT = 8080;

app.get("/producto", (req, res) => {
  (async () => {
    res.status(200).json(await product.getAll());
  })();
  // res.send("<h1>Heading 1 goes here</h1>");
});

app.get("/productoRandom", (req, res) => {
  (async () => {
    const totalProducts = await product.getAll();
    const total = totalProducts.length;
    const randNum = Math.ceil(Math.random() * total);
    console.log(randNum);
    res.status(200).json(await product.getById(randNum));
  })();
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
