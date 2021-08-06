const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const auth = require("../middleware/auth");

router.get("/:postId", auth, async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({
        where: { PostId: postId }});
    res.json(comments);
});

router.post("/", auth, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;