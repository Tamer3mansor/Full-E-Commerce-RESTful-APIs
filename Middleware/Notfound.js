const apiError = require("../utils/apiError");
const notfound =(req,res,next)=>{
    next(new apiError("can not find this route"),400);
};
module.exports = notfound;