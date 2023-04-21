const multer = require("multer");

const ALLOWED_SIZE = 1024 * 1024 * 50; // 5MB

const upload = multer({
  limits: { fileSize: ALLOWED_SIZE }, // 2 MB
  fileFilter: (req, file, cb) => {
    const uploadFile = parseInt(req.headers["content-length"]);
    console.log(uploadFile);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      (file.mimetype == "image/jpeg" && uploadFile < ALLOWED_SIZE)
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = upload;
