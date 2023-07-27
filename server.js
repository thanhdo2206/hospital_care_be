const express = require("express");
const rootRouter = require("./routers");
const { sequelize } = require("./models");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cors());

//cài ứng dụng sử dụng kiểu json
app.use(express.json());

//sử dụng cookie
app.use(cookieParser());

//dùng router
app.use("/api/v1", rootRouter);

app.get("/get", (req, res) => {
  res.send({ mess: "Hello" });
});

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
