const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return `Bearer ${accessToken}`;
};

const generateRefresshToken = (payload) => {
  const refreshtoken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return `Bearer ${refreshtoken}`;
};

module.exports = { generateAccessToken, generateRefresshToken };
