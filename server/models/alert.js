import mongoose from "mongoose";
import { symbolSchema } from "./symbol.js";
import { sideSchema } from "./side.js";
import { statusSchema } from "./orderStatus.js";

const Schema = mongoose.Schema;

export const alertSchema = mongoose.Schema({
  symbol: { ...symbolSchema, required: true },
  prop: { type: String, enum: ["PRICE", "CHANGE", "VOLUME"] },
  level: { type: String, enum: ["ABOVE", "BELOW"] },
  stat: { type: Number, default: 0 },
  dateTime: { type: Date, default: new Date() },
  type: { type: String, default: "EVENT" },
  seen: { type: Boolean, default: false },
});

export const orderAlertSchema = mongoose.Schema({
  symbol: { ...symbolSchema, required: true },
  stat: { type: Number, default: 0 },
  dateTime: { type: Date, default: new Date() },
  type: { type: String, default: "ORDER" },
  seen: { type: Boolean, default: false },
  side: { type: sideSchema },
  status: statusSchema,
});
