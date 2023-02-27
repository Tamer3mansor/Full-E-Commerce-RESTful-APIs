//slugify for slugging input 
const { default: slugify } = require('slugify');
const categoryModel = require('../Models/categoryModel')
// asyncHandler to avoid using try & catch with async wait 
const asyncHandler = require('express-async-handler');
const getCategory =  asyncHandler(async(req,res)=>{
  //pagination for return specific numbers
  const page= +req.query.page || 1;
  const limit=+req.query.limit || 5;   
  const skip =(page-1)*limit;
  const allCategory = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).send(allCategory);

})
const createCategory= asyncHandler(async(req , res)=>{
    const name = req.body.name;
      let category = await categoryModel.create({name, slug: slugify(name)});
      res.status(201).json({data : category})
})
const getSpecificCategory = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if(category) res.status(200).json({category})
  else res.status(400).json({msg:"No Category with this id"})
})
const deleteCategory = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if(category) res.status(200).json({category})
  else res.status(400).send({msg:"No Category with this id"})
})
const updateCategory = asyncHandler(async(req,res)=>{
  const { id } = req.params;
  const name = req.body.name;
  const category = await categoryModel.findByIdAndUpdate(
    {_id : id},
    {name , slug:slugify(name)},
    {new : true});
  if(category) res.status(200).json({category})
  else res.status(400).send({msg:"No Category with this id"})
})


module.exports = {createCategory , getCategory,getSpecificCategory,deleteCategory , updateCategory}