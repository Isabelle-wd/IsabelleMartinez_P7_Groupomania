const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const multer = require("../middleware/multer-config")
const auth = require("../middleware/auth");

// Création d'un post
router.post("/", auth, multer, async (req, res) => {
  try {
    const post = JSON.parse(req.body.post);
    post.UserId = req.user.id;
    post.url = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    console.log(req.file.filename)
    await Posts.create(post);
    res.json(post);
  }
  catch (error) { 
        res.status(500).send()
        console.error(error);
      };
});

// Voir tous les posts
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

// Cliquer sur un post
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

// Liste des posts d'un utilisateur dans son profil
router.get("/getUserPosts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
      where: { UserId: id },
      include: [ Likes ],
    });
    res.json(listOfPosts);
  }
  catch (error) { 
    res.status(500).send()
    console.error(error);
  };
});

// Supprimer un post
router.delete("/:postId", auth, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("supprimé!");
});

module.exports = router;