import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  templateId: String,
  email: String,
  paymentId: String
});

export default mongoose.models.Order ||
mongoose.model("Order", OrderSchema);