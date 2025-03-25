import { Schema, model } from "mongoose";

const demoLoadedSchema = new Schema({
  loaded: Number,
});

const DemoLoaded = model("DemoLoaded", demoLoadedSchema);
export default DemoLoaded;
