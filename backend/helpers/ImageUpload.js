const multer = require("multer");
const path = require("path");
const i18n = require("./i18n");
i18n.setLocale("br");

// store destination
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("categories")) {
      folder = "categories";
    } else if (req.baseUrl.includes("accessory")) {
      folder = "accessory";
    } else if (req.baseUrl.includes("carroussel")) {
      folder = "carroussel";
    }
    cb(null, `public/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(newError(i18n.__("IMAGE_INVALID_FORMAT")));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
