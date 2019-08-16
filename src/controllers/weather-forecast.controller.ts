import { Request, Response, Router } from "express";
import { WeatherForecastHelper, MongoCrudHelper } from "./../helpers";
import logger from "../logger";

const router: Router = Router();

router.get("/forecast", async (req: Request, res: Response) => {
  logger.debug(`inside WeatherForecastController controller - /forecast`);
  try {
    let forecastData = await WeatherForecastHelper.getWeatherForecastData();
    res.status(200).send({
      data: forecastData,
      status: "SYS_200",
      message: "request successful",
      error: false
    });
    await MongoCrudHelper.insertAuditData({ req, res });
  } catch (error) {
    res.sendStatus(500).send({
      status: "SYS_500",
      message: "request unsuccessful",
      error: false
    });
    await MongoCrudHelper.insertAuditData({ req, res });
  }
});

export const WeatherForecastController: Router = router;
