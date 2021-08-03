const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require ("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();


// Inscription 
router.post("/", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        let hash = await bcrypt.hash(password, 10);
        Users.create ({
            email: email,
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    } catch (error) { 
        res.status(500).send()
        console.error(error);
    };
});

// Connexion
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await Users.findOne({
            where: {email: email}
        });

    if (!user) res.json({ error: "Identifiant inconnu!"});

    bcrypt.compare(password, user.password)
    .then(async (match) => {
        if (!match) 
            return res.status(401).json({error: "Mot de passe incorrect !"});
        
        const accessToken = sign({
            email: user.email, 
            id: user.id},
            process.env.TOKEN,
            {expiresIn: "24h"}
        );        
        res.json({ 
            auth: true, 
            token: accessToken, 
            email: email, 
            id: user.id });
    })}
    catch (error) { 
        res.status(500).send()
        console.error(error);
      };
}); 
    
router.get("/auth", (req, res) => {
    res.json(req.user);
});


module.exports = router;