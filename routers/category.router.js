const express = require("express");
const categoryController = require("../controllers/category.controller");

const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);

module.exports = categoryRouter;
