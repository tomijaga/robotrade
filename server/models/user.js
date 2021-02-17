import mongoose from "mongoose";
import { watchlistSchema } from "./watchlist.js";
import { symbolSchema } from "./symbol.js";
import { eventSchema } from "./event.js";
import { alertSchema, orderAlertSchema } from "./alert.js";
import { portfolioSchema } from "./portfolio.js";
import { robotradeSchema } from "./robotrade.js";

let userSchema = mongoose.Schema({
  username: String,
  adminType: { type: String, default: "none" },
  StockCrawler: {
    visible: { type: Boolean, default: true },
    symbols: [symbolSchema],
  },
  trading_page_stocks: {},
  recent_stocks: [{ symbol: String, name: String }],
  normal_alerts: [alertSchema],
  order_alerts: [orderAlertSchema],
  events: [eventSchema],
  watchlists: [watchlistSchema],
  portfolio: portfolioSchema,
  robotrade: robotradeSchema,
});

export default mongoose.model("user", userSchema);
