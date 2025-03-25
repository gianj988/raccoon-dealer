import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import apiRouter from "./routes/api.js";
import cors from "cors";

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: [
      `http://localhost:${process.env.PORT || "3000"}`,
      `http://127.0.0.1:${process.env.PORT || "3000"}`,
    ],
  }),
);
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
/* questa instrada le richieste alla build di react */
app.use(express.static(path.join(__dirname, "build")));
/* questo sarà per le API */
app.use("/api", apiRouter);

app.get("/cdn/:imageName", (req, res) => {
  const webp = ["racsock2", "racsock4", "racsock5", "racsock9"];
  const ext = webp.includes(req.params.imageName) ? "webp" : "jpg";
  res.sendFile(
    path.join(
      __dirname,
      "build",
      "product_cdn",
      `${req.params.imageName}.${ext}`,
    ),
  );
});

// fallback per fargli rispondere sempre con react, il resto del lavoro lo farà il react-router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
