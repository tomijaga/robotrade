import mongoose from "mongoose";

export const statusSchema = {
  type: String,
  enum: ["CANCELLED", "FILLED", "PARTIALLY_FILLED", "TERMINATED", "WORKING"],
  default: "WORKING",
};
