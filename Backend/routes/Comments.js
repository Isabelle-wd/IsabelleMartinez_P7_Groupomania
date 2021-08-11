const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");
const auth = require("../middleware/auth");

router.get("/:postId", auth, async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({
        where: { PostId: postId }});
    res.json(comments);
});

router.post("/", auth, async (req, res) => {
  const commentData = {
    comment: req.body.content,
    createdby: req.user.username,
    postId: req.body.postId
  }
  Comment.create(commentData)
      .then(() => res.status(201).json({message: "Commentaire enregistré !", data: commentData}))
      .catch( error => res.status(400).json({error}))
})




/*   const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
}); */

module.exports = router;