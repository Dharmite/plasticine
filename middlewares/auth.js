const Admin = require("../models/Admin");
const Therapist = require("../models/Therapist");
const Parent = require("../models/Parent");

const isAdmin = (req, res, next) => {

    if(req.user.userType !== "admin"){
        res.json({msg: "unauthorized"});
    }else{
        return next();
    }
};

const isParent = (req, res, next) => {

    if(req.user.userType !== "parent"){
        res.json({msg: "unauthorized"});
    }else{
        return next();
    }
};

const isTherapist = (req, res, next) => {

    if(req.user.userType !== "therapist"){
        res.json({msg: "merda"});
    }else{
        return next();
    }
};

module.exports = {
  isAdmin: isAdmin,
  isParent: isParent,
  isTherapist: isTherapist
};
