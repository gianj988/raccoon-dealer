import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
import mockProducts from "./MOCK_DATA.js";
import DemoLoaded from "./models/demo_loaded.js";
import Product from "./models/product.js";

// console.log("FROM DATABASE/CONNECTION.JS", process.env);

async function loadDemoData() {
  try {
    await Product.insertMany(mockProducts);
    await DemoLoaded.insertOne({ loaded: 1 });
    console.warn("Prodotti demo aggiunti.");
  } catch (e) {
    console.error("Errore caricando i dati demo");
    console.error(e);
  }
}

async function checkDemoData() {
  const demoDataLoaded = await DemoLoaded.find({ loaded: 1 }).exec();
  return demoDataLoaded.length >= 1;
}

async function connectToDatabase() {
  let dbConnectionSuccess = true;
  try {
    const connstring = `mongodb://${process.env.DBUSER}:${process.env.DBPSW}@mongodb:${process.env.DBPORT}/${process.env.DBNAME}`;
    console.log("Using mongo connstring:", connstring);
    await mongoose.connect(connstring);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error);
    dbConnectionSuccess = false;
  } finally {
    if (dbConnectionSuccess && process.env.DEMODE === "1") {
      try {
        console.log("Modalità demo: controllo dati...");
        const demoDataAreLoaded = await checkDemoData();
        if (!demoDataAreLoaded) {
          console.log("Modalità demo: inserimento dati demo...");
          await loadDemoData();
        }
      } catch (err) {
        console.error("Errore caricando i dati demo");
        console.error(err);
      }
    }
    return dbConnectionSuccess;
  }
}

export { connectToDatabase };
