const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    addressTitle: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema, "address");
