const mongoose = require("mongoose");
require("dotenv").config();
const connect = async(uri)=>{
let connection = await mongoose.connect(uri);
return connection;
};
module.exports=connect;