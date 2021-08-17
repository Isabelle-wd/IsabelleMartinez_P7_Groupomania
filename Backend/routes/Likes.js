const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({ //cherche si le post a déjà été aimé par le user
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ 
      PostId: PostId, UserId: UserId }); //like post
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId }, //unlike post (enlève le like)
    });
    res.json({ liked: false });
  }
});

module.exports = router;