const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
//const multer = require("../middleware/multer-config")
const { validateToken } = require("../middleware/auth");

router.post("/", validateToken, async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  }
  catch (error) { 
        res.status(500).send()
        console.error(error);
      };
});

router.get("/", validateToken, async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  }
  catch (error) { 
    res.status(500).send()
    console.error(error);
  };
});

router.get("/getOnePost/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
  }
  catch (error) { 
    res.status(500).send()
    console.error(error);
  };
});



module.exports = router;