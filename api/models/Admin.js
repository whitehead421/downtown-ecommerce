const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  admin: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Admin", AdminSchema, "admins");
