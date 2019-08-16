import fs from "fs";
import logger from "../logger";

const weatherForecastJson = JSON.parse(
  fs.readFileSync("./config/weather-forecast-response.json", "utf-8")
);

export class WeatherForecastHelper {
  /**
   * getting the weather forecasting data if the current date is prime number else send 'Date is not prime so no date' as response
   */
  public static getWeatherForecastData() {
    logger.debug(`inside getWeatherForecastData()`);
    try {
      let date = new Date().getDate();
      if (this.checkPrime(date)) {
        return weatherForecastJson;
      }
      return "Date is not prime so no date";
    } catch (error) {
      logger.error(`Error in getting weather forecast data: ${error}`);
      throw error;
    }
  }

  /**
   * checking the prime number for the given date
   * @param date current day's date
   */
  public static checkPrime(date: number) {
    logger.debug(`inside checkPrime()`);
    if (date === 1) {
      return false; // 1 is unique number that means non-prime number
    }
    if (date === 2) {
      return true;
    }
    for (var i = 2; i < date; i++) {
      if (date % i == 0) {
        return false;
      }
    }
    return true;
  }
}
