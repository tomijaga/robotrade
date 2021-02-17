import mongoose from "mongoose";
import { statusSchema } from "./orderStatus.js";
import { sideSchema } from "./side.js";
import { symbolSchema } from "./symbol.js";

const Schema = mongoose.Schema;

export const orderSchema = mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    symbol: { ...symbolSchema, required: true },
    quantity: { type: Number, default: 0, required: true },
    startTime: { type: Date, default: new Date() },
    side: { ...sideSchema, required: true },
    status: { ...statusSchema, required: true },
    orderType: { type: String, enum: ["MARKET", "LIMIT"], required: true },
    expireType: { type: String, enum: ["GTC", "DAY"], required: true },
    limitPrice: { type: Number, default: 0 },
    endTime: { type: Date },
    quantityFilled: { type: Number, default: 0 },
    executionPrice: { type: Number, default: 0 },
    username: { type: String },
  },
  { strict: false }
);

export default mongoose.model("Orders", orderSchema);
