const {check,validationResult } = require("express-validator");
const message=(req, res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
    
        }
        next();
};

const checkId=[check("category").isMongoId().withMessage("Invalid id"),message];
const checkCreate=[check("name").notEmpty().withMessage("Category required").isLength({min:3}).withMessage("Too short name").isLength({max:35}).withMessage("Max length is 35 char"),message];
module.exports={checkId,checkCreate};