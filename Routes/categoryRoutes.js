const express = require("express");
const categoryApi = express.Router();
const {checkId,checkCreate} = require("../Middleware/validator");
const {createCategory,getCategory , deleteCategory , getSpecificCategory , updateCategory} = require("../Controller/categoryController");
categoryApi.route("/")
.post(checkCreate,createCategory)
.get(getCategory);
categoryApi.route("/:id")
.get(checkId,getSpecificCategory)
.put(checkId,updateCategory)
.delete(checkId,deleteCategory);
module.exports = categoryApi;