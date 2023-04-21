const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const addressRoute = require("./routes/address");
const sqlRoute = require("./routes/sqlApi");
const imagesRoute = require("./routes/image");
const secretRoute = require("./routes/secret");
const noteRoute = require("./routes/note");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

console.clear();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo DB Atlas connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/address", addressRoute);
app.use("/api/images", imagesRoute, express.static("../image"));
app.use("/sql/products", sqlRoute);
app.use("/api/secret", secretRoute);
app.use("/api/note", noteRoute);

try {
  app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
} catch (err) {
  console.log("Something is not right!", err);
}
