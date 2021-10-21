const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/basicinfo/:id", async (req, res) => {
  console.log("profile");
    const id = req.params.id;
  
    const basicInfo = await Users.findByPk(id);
    
  
    res.json(basicInfo);
  });

module.exports = router;