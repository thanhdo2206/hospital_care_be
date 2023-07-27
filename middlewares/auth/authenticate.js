const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticate = (req, res, next) => {
  const { accessToken } = req.cookies;
  console.log("accessToken authenticate method", accessToken);

  if (!accessToken) return res.status(401).json("You don't login");
  //token sẽ có dạng
  //Bearer [token] vì vậy mình phải cắt chuỗi ra
  const token = accessToken ? accessToken.split(" ")[1] : "";

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res.status(401).send("You don't login");
    }

    req.user = decode;
    console.log("decode authenticate method", decode);
    next();
  } catch (error) {
    return res.status(401).send({
      statusCode: 401,
      message: error.message,
    });
  }
};

module.exports = { authenticate };
