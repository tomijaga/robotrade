import mongoose from "mongoose";
import { symbolSchema } from "./symbol.js";

export const dailySchema = {
  date: { type: Date, default: new Date() },
  net_account_value: { type: Number, default: 0 },
  equity: { type: Number, default: 0 },
  PnL: { type: Number, default: 0 },
  traded_stocks_data: [
    { symbol: symbolSchema, PnL: { type: Number, default: 0 } },
  ],
};
