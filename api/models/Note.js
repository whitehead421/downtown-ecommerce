const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  note: { type: String, required: true },
});

module.exports = mongoose.model("Note", NoteSchema, "notes");
