import mongoose from "mongoose";
import { readFile } from "fs/promises";
import config from "../config.js";
import Product from "../models/Product.js";

const products = JSON.parse(
  await readFile(new URL("./products.json", import.meta.url))
);

async function seed() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");

    await Product.deleteMany();
    console.log("Koleksi produk dikosongkan");

    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} produk berhasil dimasukkan`);
  } catch (err) {
    console.error("Seed gagal:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("Koneksi ditutup");
  }
}

seed();