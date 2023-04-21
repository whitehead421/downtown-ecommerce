const mongoose = require("mongoose");

const SecretSchema = new mongoose.Schema({
  secret: { type: String, required: true },
});

module.exports = mongoose.model("Secret", SecretSchema, "secret");
