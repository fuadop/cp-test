import { Schema, model } from "mongoose";

interface Cache {
  expiresAt: Date,
  symbols: string[]
}

interface IRate {
  expiresAt: Date,
  rates: { [x: string]: number },
  base: string
}

// model to reduce api calls to paid fixer.io endpoints
const cacheSchema = new Schema<Cache>({
  symbols: {
    type: [String],
    required: true
  }
});

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
});

export const Rate = model("rate", rateSchema);
export default model("cache", cacheSchema);
