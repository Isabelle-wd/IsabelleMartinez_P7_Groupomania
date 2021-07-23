const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require ("bcrypt");
require("dotenv").config();
const { validateToken } = require("../middleware/auth");
const { sign } = require("jsonwebtoken");

// Inscription 
router.post("/", async (req, res) => {
  const {email, password} = req.body;
  bcrypt.hash(password, 10)
    .then ((hash) => {
        Users.create({
            email: email, 
            password: hash,
        });
        res.json("bravo!");
    });  
});

// Connexion
router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await Users.findOne({
        where: {email: email}
    });

    if (!user) res.json({ error: "identifiant inconnu!"});

    bcrypt.compare(password, user.password)
    .then(async (match) => {
        if (!match) 
            return res.status(401).json({error: "Mot de passe incorrect !"});
        
        const accessToken = sign({
            email: user.email, 
            id: user.id},
            process.env.TOKEN,
            {expiresIn: "1h"}
        );        
        res.json({ token: accessToken, email: email, id: user.id });
    });  
}); 
    
router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
});


module.exports = router;