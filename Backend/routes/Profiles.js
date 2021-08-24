const express = require("express");
const router = express.Router();
const { Profiles } = require("../models");

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Profiles.findByPk(id);
  
    res.json(basicInfo);
  });

module.exports = router;