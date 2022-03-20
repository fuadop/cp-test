import {
  Request,
  Response,
  NextFunction
} from "express";
import { config } from "dotenv";
import { request } from "undici";
import Cache, { Rate } from "../models/cache";
import handleResponse from "../utils/response";

config();

type Controller = () => (req: Request, res: Response, next: NextFunction) => any;

const ACCESS_KEY = process.env.ACCESS_KEY || "ACCESS_KEY";
export const symbols: Controller = () =>
  async (_, res, next) => {
    try {
      let symbol;
      const symbols = await Cache.find();
      if (!symbols.length) {
        const response = await request(`http://data.fixer.io/api/symbols?access_key=${ACCESS_KEY}`, { method: "GET" });
        const data = await response.body.json();

        symbol = await Cache.create({
          symbols: Object.keys(data.symbols),
          // expire in 4 hrs
          expireAt: new Date().setHours(new Date().getHours() + 4)
        });
      } else {
        ([symbol] = symbols)
      }

      return handleResponse(res, 200, "symbols fetched", { ...symbol.toObject(), _id: undefined, __v: undefined });
    } catch (e) {
      return next(e);
    }
  };

// waste: api subscription access failure
export const convert: Controller = () =>
  async (req, res, next) => {
    const {
      from = "QAR",
      to = "USD",
      amount = 0
    } = req.body;

    try {
      const response = await request(
        `http://data.fixer.io/api/convert?access_key=${ACCESS_KEY}&from=${from}&to=${to}&amount=${amount}`,
        { method: "GET" }
      );

      const data = await response.body.json();
      console.log(data);
      if (!data.success) {
        return handleResponse(res, 500, "retry conversion");
      }

      return handleResponse(res, 200, "conversion successful", data);
    } catch (e) {
      return next(e);
    }
  };

export const manualConvert: Controller = () =>
  async (req, res, next) => {
    try {
      const {
        from = "EUR",
        to = "USD",
        amount = 0
      } = req.body;

      let rate = await Rate.findOne({
        base: from
      });

      if (!rate) {
        // make api call to get rate
        const response = await request(`http://data.fixer.io/api/latest?access_key=${ACCESS_KEY}`, { method: "GET" });
        const data = await response.body.json();

        if (!data.success) {
          throw new Error("unknown error occurred, please retry");
        }

        // expire in 15 mins, since rates may change quick
        rate = await Rate.create({
          expireAt: new Date().setMinutes(new Date().getMinutes() + 15),
          base: data.base, 
          rates: data.rates
        });
      } 
      // convert here
      const { rates } = rate;
      const toEquivalent = rates[to];
      if (!toEquivalent) {
        throw new Error("Couldn't convert: symbol exchange not found");
      }

      const result = amount * toEquivalent;
      return handleResponse(res, 200, "conversion successful", { result });
    } catch (e) {
      return next(e);
    }
  }