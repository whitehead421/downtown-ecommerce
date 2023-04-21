const Address = require("../models/Address");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newAddress = new Address(req.body);

  try {
    const savedAddress = await newAddress.save();
    res.status(200).json(savedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ADDRESSES
router.get("/find/:userId", async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ONE ADDRESS
router.get("/findone/:addressID", async (req, res) => {
  try {
    const addresses = await Address.findOne({ _id: req.params.addressID });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json("Address has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
