const multer = require("multer");
const path = require("path");

// store destination
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes("categories")) {
      folder = "categories";
    } else if (req.baseUrl.includes("accessory")) {
      folder = "accessory";
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
      return cb(
        newError(`Formato de imagem inválido. Apenas png, jpg ou jpeg`)
      );
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
