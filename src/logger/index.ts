import * as winston from "winston";
import { get } from "config";

const { combine, label, timestamp, printf } = winston.format;
const appName = "sRide-test-repo";

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const options: winston.LoggerOptions = {
  level: get("logger.level"),
  // format: combine(label({ label: appName }), timestamp(), printf(info => JSON.stringify(info))),
  format: combine(label({ label: appName }), timestamp(), myFormat),
  transports: [new winston.transports.Console()]
};

const logger = winston.createLogger(options);
export default logger;
