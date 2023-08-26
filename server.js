const express = require("express");
const rootRouter = require("./routers");
const { sequelize } = require("./models");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

// app.use(cors({ credentials: true, origin: process.env.URL_REACT }));
app.use(cors());

//cài ứng dụng sử dụng kiểu json
app.use(express.json());

//sử dụng cookie
app.use(cookieParser());

//dùng router
app.use("/api/v1", rootRouter);

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
