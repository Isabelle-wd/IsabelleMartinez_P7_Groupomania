const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require ("bcrypt");

// Inscription 
router.post("/", async (req, res) => {
  const {username, password} = req.body;
  bcrypt.hash(password, 10)
    .then ((hash) => {
        Users.create({
            username: username, 
            password: hash
        });
        res.json("bravo!");
    });  
});

// Connexion
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({
        where: {username: username}});

    if (!user) res.json({ error: "identifiant inconnu!"});

    bcrypt.compare(password, user.password)
    .then((match) => {
        if (!match) res.json({ error: "l'identifiant et le mot de passe ne match pas!"});

        res.json("vous êtes connecté!");
    });


    });    


module.exports = router;