const path = require("path");

const getNameFile = (filePath) => {
  return path.parse(filePath).name;
};

const getPublicIdCloudinary = (url) => {
  const index1 = url.indexOf("hospital_care");

  const index2 = url.lastIndexOf(".");

  const public_id = url.substring(index1, index2);
  return public_id;
};

module.exports = { getNameFile, getPublicIdCloudinary };
