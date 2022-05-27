// const fs = require("fs");
import * as fs from "fs";

export class Contenedor {
  static id = 0;

  constructor(archivo, producto) {
    this.archivo = archivo;
    this.objects = [];
  }

  addId() {
    Contenedor.id += 1;
  }

  async save(product) {
    try {
      this.addId();
      product["id"] = Contenedor.id;
      this.objects.push(product);
      fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
    } catch (error) {
      console.log("Error writing file");
    }

    // console.log(this.objects);

    return Contenedor.id;
  }

  async getById(idNumber) {
    try {
      const data = JSON.parse(await fs.promises.readFile(this.archivo));
      const object = data.find((obj) => obj.id === idNumber);
      if (object) {
        return object;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Error reading object");
    }
  }

  async getAll() {
    try {
      const data = JSON.parse(await fs.promises.readFile(this.archivo));
      return data;
    } catch (error) {
      console.log("Error getting all objects");
    }
  }

  async deleteAll() {
    try {
      this.objects = [];
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
      console.log("All objects were deleted");
    } catch (error) {
      console.log("Objects not deleted");
    }
  }

  async deleteById(idNumber) {
    try {
      let data = JSON.parse(await fs.promises.readFile(this.archivo));
      const object = data.find((obj) => obj.id === idNumber);
      this.objects = data.filter((obj) => obj.id !== object.id);
      console.log(this.objects);
      fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.objects, null, 2)
      );
    } catch (error) {
      console.log("Error deleting an object");
    }
  }
}

let product = new Contenedor("productos.txt");

// Save objects
// (async () => {
//   console.log(await product.save({ title: "manzanas", price: 3.5 }));
//   console.log(await product.save({ title: "bananas", price: 11.0 }));
//   console.log(await product.save({ title: "peras", price: 15.0 }));
//   console.log(await product.save({ title: "tomates", price: 13.0 }));
// })();

// Get an object
// (async () => {
//   console.log(await product.getById(1));
//   console.log(await product.getById(15));
// })();

// Get all objects
// (async () => {
//   console.log(await product.getAll());
// })();

// Delete an object
// (async () => {
//   await product.deleteById(2);
// })();

// Delete all objects
// (async () => {
//   await product.deleteAll();
// })();
