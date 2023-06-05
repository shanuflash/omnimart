import mongoose from "mongoose";
const onmimartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cart: {
    type: Array,
    required: true,
  },
});

export const Data =
  mongoose.models.data || mongoose.model("data", onmimartSchema);
