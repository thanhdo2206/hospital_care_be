const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../../models/index");

dotenv.config();

const authenticate = async (req, res, next) => {
  const authenticateHeader = req.header("Authorization");


  //Bearer [token] vì vậy mình phải cắt chuỗi ra
  const accessToken = authenticateHeader
    ? authenticateHeader.split(" ")[1]
    : "";

  try {
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res
        .status(401)
        .send({ statusCode: 401, message: "You don't login" });
    }

    let currentUser = await User.findOne({
      where: {
        id: decode.id,
        email: decode.email,
      },
    });

    if (!currentUser) {
      return res
        .status(401)
        .send({ statusCode: 401, message: "You don't login" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).send({
      statusCode: 401,
      message: error.message,
    });
  }
};

module.exports = { authenticate };






