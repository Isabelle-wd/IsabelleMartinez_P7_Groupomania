const jwt = require("jsonwebtoken");
const {Users} = require("../models");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN, {clockTimestamp: new Date().getTime()}, callback);
    const userId = decodedToken.id;
    req.user = await Users.findByPk(userId)  
    if (!req.user) {
      throw new Error("Utilisateur inconnu!");
    }
        next(); 
  } 
  catch (e) {
    console.error(e);
    res.status(401).json({
      error:"Requête non authentifiée!"
    });
  }
};


