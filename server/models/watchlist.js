import mongoose from "mongoose";
import { symbolSchema } from "./symbol.js";

export const watchlistSchema = mongoose.Schema({
  name: String,
  symbols: [symbolSchema],
});

export default mongoose.model("watchlist", watchlistSchema);
