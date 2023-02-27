const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
name : {
    type : String,
    required : [true , 'Require category'],
    unique : [true , 'category must be unique'],
    minlength : [3,'Too short name'],
    maxlength : [32 , 'too long name']
},
slug:{
    type : String,
    lowercase:true
},
image : String
},{timestamps: true} //time stamp to determined time to post & get & ..etc
);
const categoryModel = mongoose.model('category' , categorySchema);
module.exports = categoryModel ;