import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  templateId: String,
  paymentId: String
}, { timestamps: true });

export default mongoose.models.Order ||
mongoose.model("Order", OrderSchema);