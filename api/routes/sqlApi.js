const SqlOperations = require("../models/SqlOperations");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

router.use((req, res, next) => {
  next();
});
// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    await SqlOperations.getProducts(req, res).then((result) => {
      res.json(result);
    });
  } catch (err) {
    res.status(500);
  }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    await SqlOperations.getSingleProduct(req, res, req.params.id).then(
      (result) => {
        return res.json(result);
      }
    );
  } catch (err) {
    return err;
  }
});

// GET MAX PAGE NUMBER
router.get("/maxPage", async (req, res) => {
  try {
    await SqlOperations.getMaxPage(req, res)
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        res.status(500);
      });
  } catch (err) {
    res.status(500);
  }
});

// GET SIZE TABLE
router.get("/sizetable/:id", async (req, res) => {
  try {
    await SqlOperations.getSizeTable(req, res, req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500);
      });
  } catch (err) {
    return err;
  }
});

module.exports = router;
