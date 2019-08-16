import logger from "../logger";
import { get } from "config";

var MongoClient = require("mongodb").MongoClient;

export class MongoCrudHelper {
  private static client: any;

  public static async getConnection() {
    logger.debug(`inside getConnection`);
    try {
      if (!this.client) {
        this.client = await MongoClient.connect(
          `${get("db.mongodb.connectionUrl")}${get("db.mongodb.database")}`
        );
        return this.client;
      } else {
        return this.client;
      }
    } catch (error) {
      logger.error(`Error in db connection: ${error}`);
      throw error;
    }
  }

  public static async insertAuditData(data: any) {
    logger.debug(`inside insertAuditData`);
    try {
      let db = await this.getConnection();
      await db.collection("userAudits").insertOne({
        request: {
          url: data.req.url,
          headers: data.req.headers,
          query: data.req.query,
          params: data.req.params
        },
        response: {
          data: data.res.data,
          status: data.res.status,
          message: data.res.message,
          error: data.res.error
        },
        timestamp: new Date()
      });
      logger.debug(`Data inserted successfully`);
    } catch (error) {
      logger.error(`Error in inserting audit data: ${error}`);
      throw error;
    }
  }
}
