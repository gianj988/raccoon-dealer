import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
import mockProducts, { OrderStatuses } from "./MOCK_DATA.js";
import DemoLoaded from "./models/demo_loaded.js";
import Product from "./models/product.js";
import OrderStatus from "./models/order_status.js";

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

async function loadOrderStatuses() {
  try {
    const statuses = await OrderStatus.find();
    console.warn("Stati ordine trovati: ", statuses);
    // per rapidità di sviluppo, NON E' CORRETTO LO SO
    if (statuses.length < 2) {
      await OrderStatus.deleteMany({});
      await OrderStatus.insertMany(OrderStatuses);
    }
    console.warn("Stati ordine aggiunti.");
  } catch (e) {
    console.error("Errore caricando gli stati ordine");
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
    // per un uso più avanzato ma mi serve più tempo
    //const connstring = `mongodb://${process.env.DBUSER}:${process.env.DBPSW}@mongodb:${process.env.DBPORT}/${process.env.DBNAME}`;
    const connstring = `mongodb://mongodb:${process.env.DBPORT}/${process.env.DBNAME}`;
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
      await loadOrderStatuses();
    }
    return dbConnectionSuccess;
  }
}

export { connectToDatabase };
