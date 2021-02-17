import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const stockHistorySchema = mongoose.Schema({
  symbol: { type: String, uppercase: true, required: true },
  history: [
    {
      buyerName: String,
      sellerName: String,
      buyPrice: Number,
      sellPrice: Number,
      quantity: Number,
      dateTime: { type: Date, default: new Date() },
    },
  ],
});

export default mongoose.model("stocks", stockHistorySchema);
