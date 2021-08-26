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
  try {
    const message = req.body.message;
    const postId = req.body.PostId;
    const newComment = await Comments.create({ 
      message: message, 
      UserId: req.user.id, 
      PostId: postId, 
    });
    if (newComment) {
      res.status(201).json({ message: "merci de votre commentaire!"});
    } else {
      throw new Error ("oops!! merci de réessayer ultérieurement.")
    }
  } catch (error) {
    res.status(500).json({ error: error});
  }
});

router.delete("/:commentId", auth, async (req, res) =>{
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: { 
      id: commentId
    },
  });
  res.json("commentaire supprimé!")
})


/*   const commentData = {
    comment: req.body.content,
    createdby: req.user.username,
    postId: req.body.postId
  }
  Comments.create(commentData)
      .then(() => res.status(201).json({message: "Commentaire enregistré !", data: commentData}))
      .catch( error => res.status(400).json({error}))
}) */

module.exports = router;