import express from "express";
import http from "http";
import https from "https";
import bodyParser from "body-parser";
import logger from "./logger";
import { WeatherForecastController } from "./controllers";

const app: express.Application = express();
let server: https.Server | http.Server = new http.Server(app);
let port: number = 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    `Origin, X-Requested-With, Content-Type`
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS,GET");
  next();
});
app.use("/weather", WeatherForecastController);
app.use(bodyParser.json({ limit: "10mb" }));

server.listen(port, () => {
  logger.info(`Listening at ${port} port`);
});
