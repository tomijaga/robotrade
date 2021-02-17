import mongoose from "mongoose";
import { symbolSchema } from "./symbol.js";
import { orderSchema } from "./orders.js";
import { dailySchema } from "./dailyData.js";

export const portfolioSchema = {
  buying_power: { type: Number, default: 0 },
  equity:{ type: Number, default: 0 },
  realized_PnL: { type: Number, default: 0 },
  unrealized_PnL: { type: Number, default: 0 },
  net_value: { type: Number, default: 0 },
  active_orders: [orderSchema],
  all_traded_stocks: [{ symbol: symbolSchema, PnL: Number }],
  currently_owned_stocks: [
    {
      symbol: symbolSchema,
      quantity: { type: Number, default: 0 },
      executionPrice: { type: Number, default: 0 },
      currentPrice: { type: Number, default: 0 },
      industry: String,
    },
  ],

  transactions: [
    {
      value: { type: Number, default: 0 },
      time: { type: Date, default: new Date() },
      type: { type: String, enum: ["DEPOSIT", "WITHDRAWAL"] },
    },
  ],
  past_orders: [orderSchema],
  daily: [dailySchema],
};
