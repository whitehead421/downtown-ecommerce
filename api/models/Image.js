const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  fileNames: { type: Array, required: true },
});

module.exports = mongoose.model("Image", ImageSchema, "images");
