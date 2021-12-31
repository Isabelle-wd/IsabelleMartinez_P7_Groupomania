const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require ("bcrypt");
const { sign } = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config")
require("dotenv").config();


// Inscription 
router.post("/", multer, async (req, res) => {
    try {
        const { email, username, password, fullName, bio } = req.body;
        let hash = await bcrypt.hash(password, 10);
        Users.create ({
            email: email,
            username: username,
            password: hash,
            fullName: fullName,
            bio: bio,
            image: req.file? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`: ""
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
        const {username, password} = req.body;
        console.log(username, password);
        const user = await Users.findOne({
            where: {username: username}
        });

    if (!user) res.json({ error: "Identifiant inconnu!"});

    bcrypt.compare(password, user.password)
    .then(async (match) => {
        if (!match) 
            return res.status(401).json({error: "Mot de passe incorrect !"});
        
        const accessToken = sign({
            username: user.username, 
            id: user.id},
            process.env.TOKEN,
            {expiresIn: "24h"}
        );        
        res.json({ 
            auth: true, 
            token: accessToken, 
            username: username, 
            id: user.id });
    })}
    catch (error) { 
        res.status(500).send()
        console.error(error);
      };
}); 
    
router.get("/auth", auth, (req, res) => {
    res.json(req.user);
});

// Profile
router.get("/basicinfo", auth, async (req, res) => {
    
  
  
    res.json(req.user);
  });

module.exports = router;