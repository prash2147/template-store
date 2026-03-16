import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  title: String,
  price: Number,
  video: String,
  description: String,
  category: String,

  download: String

});

export default mongoose.models.Template ||
  mongoose.model("Template", TemplateSchema);