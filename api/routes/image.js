const Image = require("../models/Image");
const upload = require("../middlewares/uploadMiddleware");
const Resize = require("../helper/ResizeImage");
const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { uuid } = require("uuidv4");

router.get("/", async function (req, res) {
  await res.json("Image upload service.");
});

router.get("/image/:id", async (req, res) => {
  try {
    return res
      .status(200)
      .sendFile(path.join(__dirname, "../../image/") + req.params.id + ".png");
  } catch (err) {
    return err;
  }
});

//? USTTEKI RESIMLERIN KENDISINI RES SEND FILE OLARAK GONDERIYOR VE POSTMANDE DE CIKIYOR
//? ALTTAKI RESIMLERIN IDLERINI GETIRIYOR IMAGE KLASORUNDEKI

router.get("/image/find/:id", async (req, res) => {
  try {
    const image = await Image.findOne({ productID: req.params.id });
    res.status(200).json(image.fileNames);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/post", upload.any("image"), async function (req, res) {
  const fileNames = [];
  const imagePath = path.join("../image");
  const productID = req.body.productID;
  for (let i = 0; i < req.files.length; i++) {
    const imageName = req.files[i];
    const fileUpload = new Resize(imagePath, imageName);
    if (!req.files[i]) {
      res.status(401).json({ error: "Please provide an image!" });
    }
    const filename = await fileUpload
      .save(req.files[i].buffer)
      .then((res) => fileNames.push(res));
  }

  const newImage = new Image({ productID, fileNames });

  try {
    const savedImage = await newImage.save();
    res.status(200).json(savedImage);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const image = await Image.findOne({ productID: req.params.id });
  if (!image) {
    return res.status(404).json("Image not found!");
  } else {
    await Image.deleteOne({ productID: req.params.id });
  }
});
module.exports = router;
