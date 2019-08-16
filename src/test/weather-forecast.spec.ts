import { expect } from "chai";
import "mocha";
import { WeatherForecastHelper } from "../helpers";
import fs from "fs";

const weatherForecastJson = JSON.parse(
  fs.readFileSync("./config/weather-forecast-response.json", "utf-8")
);

describe("checkPrime number function", () => {
  it("should return boolean value after checking prime number", () => {
    const response = WeatherForecastHelper.checkPrime(17);
    expect(response).to.equal(true);
  });

  it("should return boolean value after checking prime number", () => {
    const response = WeatherForecastHelper.checkPrime(4);
    expect(response).to.equal(false);
  });
});

describe("getWeatherForecastData function", () => {
  it("should return forecast object according to date", () => {
    const response = WeatherForecastHelper.getWeatherForecastData();
    if (WeatherForecastHelper.checkPrime(new Date().getDate())) {
      expect(response).to.equal(weatherForecastJson);
    } else {
      expect(response).to.equal("Date is not prime so no date");
    }
  });
});
