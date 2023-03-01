const express = require("express");
const categoryApi = express.Router();
const {createCategory,getCategory , deleteCategory , getSpecificCategory , updateCategory} = require("../Controller/categoryController");
categoryApi.route("/").post(createCategory).get(getCategory);
categoryApi.route("/:id").get(getSpecificCategory).put(updateCategory).delete(deleteCategory);
module.exports = categoryApi;