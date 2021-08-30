const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;
  
    const basicInfo = await Users.findByPk(id);
  
    res.json(basicInfo);
  });

module.exports = router;