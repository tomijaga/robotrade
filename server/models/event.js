import mongoose from "mongoose";
import { symbolSchema } from "./symbol.js";

const Schema = mongoose.Schema;

export const eventSchema = mongoose.Schema({
  symbol: symbolSchema,
  type: { type: String, enum: ["ORDER", "EVENT"], required: true },
  prop: { type: String, enum: ["PRICE", "CHANGE", "VOLUME"], required: true },
  level: { type: String, enum: ["ABOVE", "BELOW"], required: true },
  stat: { type: Number, default: 0 },
  action: { type: String, enum: ["ALERT", "BUY", "SELL"], required: true },
  actionQuantity: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  called_today: { type: Boolean, default: false },
  username: String,
});

export default mongoose.model("Events", eventSchema);
