const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require ("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../middleware/auth")
require("dotenv").config();


// Inscription 
router.post("/", async (req, res) => {
    try {
        const { email, username, password } = req.body;
            bcrypt
                .hash(password, 10)
                .then ((hash) => {
                    Users.create ({
                        email: email,
                        username: username,
                        password: hash,
                    });
        res.json("SUCCESS");
    })}
    catch (error) {
        throw error;
      };
});

// Connexion
router.post("/login", async (req, res) => {
    try{
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
        res.json({ 
            token: accessToken, 
            email: email, 
            id: user.id });
    })}
    catch (error) {
        throw error;
      };
}); 
    
router.get("/auth", auth, (req, res) => {
    res.json(req.user);
});


module.exports = router;