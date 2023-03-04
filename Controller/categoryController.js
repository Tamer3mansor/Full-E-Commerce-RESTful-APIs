//slugify for slugging input
const { default: slugify } = require("slugify");
const categoryModel = require("../Models/categoryModel");
const apiError = require("../utils/apiError");
// asyncHandler to avoid using try & catch with async wait
const asyncHandler = require("express-async-handler");

const getCategory = asyncHandler(async (req, res, next) => {
  //pagination for return specific numbers
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;
  const skip = (page - 1) * limit;
  const allCategory = await categoryModel.find({}).skip(skip).limit(limit);
  if (!allCategory) {
    next(new apiError("No Category Found"), 400);
  }
  res.status(200).send(allCategory);
});
const createCategory = asyncHandler(async (req, res,next) => {
  const name = req.body.name;
  try{let category = await categoryModel.create({ name, slug: slugify(name) }); 
  res.status(201).json({ data: category });}
  catch(error){
    let message="";
     if(error.code==11000)
     message+=`This category already in dataBase<${error.name}>`;
     else message+=`Error while trying to create try agin <${error.name}>`;
  next(new apiError(message),error.code);
  }
});
const getSpecificCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (category) res.status(200).json({ category });
  else {
    next(new apiError("No Category Found with this id"), 400);
  }
});
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (category) res.status(200).json({ category });
  else next(new apiError("No Category Found with this id"), 400);
});
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const name = req.body.name;
  const category = await categoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (category) res.status(200).json({ category });
  else next(new apiError("No Category Found with this id"), 400);
});

module.exports = {
  createCategory,
  getCategory,
  getSpecificCategory,
  deleteCategory,
  updateCategory,
};
