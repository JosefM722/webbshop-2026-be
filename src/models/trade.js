import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },   
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;