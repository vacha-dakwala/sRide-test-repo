import { Request, Response, Router } from "express";
import { WeatherForecastHelper, MongoCrudHelper } from "./../helpers";
import logger from "../logger";

const router: Router = Router();

/**
 * Method: GET
 * send forecast data if the date is prime
 * send string message if the date is non-prime
 */
router.get("/forecast", async (req: Request, res: Response) => {
  logger.debug(`inside WeatherForecastController controller - /forecast`);
  let responseJson;
  try {
    let forecastData = await WeatherForecastHelper.getWeatherForecastData();
    responseJson = {
      data: forecastData,
      status: "SYS_200",
      message: "request successful",
      error: false
    };
    res.status(200).send(responseJson);
    await MongoCrudHelper.insertAuditData({ req, res: responseJson });
  } catch (error) {
    responseJson = {
      status: "SYS_500",
      message: "request unsuccessful",
      error: false
    };
    await MongoCrudHelper.insertAuditData({ req, res: responseJson });
  }
});

export const WeatherForecastController: Router = router;
