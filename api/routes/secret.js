const Secret = require("../models/Secret");
const Admin = require("../models/Admin");

const router = require("express").Router();

// GET SECRET
router.get("/:id", async (req, res) => {
  try {
    const secret = await Secret.find({ secret: req.params.id });
    if (secret.length !== 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// CHECK IF IT IS IN ADMIN ARRAY
router.get("/admin/:id", async (req, res) => {
  try {
    const admins = await Admin.find({ admin: req.params.id });
    if (admins.length !== 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
