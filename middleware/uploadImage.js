const multer = require("multer");

function uploadImage(carpeta) {
  console.log("ha entrado en multer");
  const storage = multer.diskStorage({
    destination: `./public/images/${carpeta}`,
    filename: function (req, file, cb) {
      console.log(file);

      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("img");

  return upload;
}

module.exports = uploadImage;
