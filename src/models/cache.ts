import { Schema, model } from "mongoose";

interface Cache {
  expireAt: Date,
  symbols: string[]
}

interface IRate {
  expireAt: Date,
  rates: { [x: string]: number },
  base: string
}

// model to reduce api calls to paid fixer.io endpoints
const cacheSchema = new Schema<Cache>({
  symbols: {
    type: [String],
    required: true
  }
}, { timestamps: true });

const rateSchema = new Schema<IRate>({
  rates: {
    type: Object,
    required: true
  },
  base: {
    type: String,
    required: true,
    default: "EUR"
  }
}, { timestamps: true });

export const Rate = model("rate", rateSchema);
export default model("cache", cacheSchema);
