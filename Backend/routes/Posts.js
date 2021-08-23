const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const multer = require("../middleware/multer-config")
const auth = require("../middleware/auth");

router.post("/", auth, multer, async (req, res) => {
  try {
    const post = req.body;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
  }
  catch (error) { 
        res.status(500).send()
        console.error(error);
      };
});

router.get("/", auth, async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    res.json(listOfPosts);
  }
  catch (error) { 
    res.status(500).send()
    console.error(error);
  };
});

router.get("/getOnePost/:id", auth, async (req, res) => {
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

router.delete("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;