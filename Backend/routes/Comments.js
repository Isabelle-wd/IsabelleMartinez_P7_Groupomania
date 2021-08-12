const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const auth = require("../middleware/auth");

router.get("/:postId", auth, async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({
      where: { postId: postId}
    })       
    res.json(comments);
});

router.post("/", auth, async (req, res) => {
  const commentData = {
    comment: req.body.content,
    createdby: req.user.username,
    postId: req.body.postId
  }
  Comments.create(commentData)
      .then(() => res.status(201).json({message: "Commentaire enregistré !", data: commentData}))
      .catch( error => res.status(400).json({error}))
})

module.exports = router;