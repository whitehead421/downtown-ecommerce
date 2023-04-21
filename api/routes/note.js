const Note = require("../models/Note");
const router = require("express").Router();

// GET NOTES
router.get("/find/:productID", async (req, res) => {
  try {
    const notes = await Note.find({ productID: req.params.productID });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE NOTE
router.post("/", async (req, res) => {
  const newNote = new Note(req.body);

  try {
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).json("This note already exists!");
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete("/find/:productID", async (req, res) => {
  try {
    await Note.findOneAndDelete({ productID: req.params.productID });
    res.status(200).json("Note has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
