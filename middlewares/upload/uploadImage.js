const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { getNameFile } = require("../../utils/cutPath");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hospital_care/avatar_patient",
    allowedFormats: ["jpg", "png", "jpeg"],
    public_id: function (req, file) {
      const fileName = file.originalname;
      const nameImg = Date.now() + "_" + getNameFile(fileName);
      return nameImg;
    },
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
