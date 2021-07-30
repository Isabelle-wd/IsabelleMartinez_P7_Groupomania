const express = require("express");
const router = express.Router();
const { Posts } = require("../models");


router.get("/", async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
  }
  catch (error) {
    throw error;
  }
});

router.get("/getOnePost/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
  }
  catch (error) {
    throw error;
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  }
  catch (error) {
    throw error;
  }
});

module.exports = router;