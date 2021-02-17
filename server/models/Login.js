import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const loginSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("Login", loginSchema);
