const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs")

const router = express.Router()

//The Signup Routes
router.get("/user/signup", (req,res)=>{
    res.render("user/signup.ejs")
})

router.post("/user/signup", async (req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    User.create(req.body, (err,user)=>{
        res.redirect("/user/login")
    })
})

router.get("/user/login", (req,res)=>{
    res.render("user/login.ejs")
})

router.post("/user/login",(req,res)=>{
    const {username,password} = req.body;
    User.findOne({username},(err,user)=>{
        if (!user){
            res.sendStatus("user doesn't exist")
        } else {
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                res.redirect("/fruits")
            } else {
                res.send("wrong password")
            }
        }
    })
})



module.exports = router;