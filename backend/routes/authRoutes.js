const express=require("express");
const bcrypt=require("bcryptjs");
const User=require("../models/User");
const jwt=require("jsonwebtoken");

const router=express.Router();

router.post("/signup", async (req, res)=>{

    try{
        const{username, email, password}=req.body;

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const user= new User({
            email,
            username,
            password:hashedPassword
        });

        await user.save();

        res.status(201).json({
            message:"user registered successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "server error"
        });
    }
});

router.post("/login", async (req, res)=>{
    try{
        const {email, password}=req.body;

        const user=await User.findOne({email});
        const isPassCorrect = user ? await bcrypt.compare(password, user.password) : false;

        if(!user || !isPassCorrect){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token=jwt.sign(
            { userId:user._id, username:user.username },
            process.env.JWT_SECRET,
            { expiresIn:"1d" }
        );

        res.json({
            message:"login successfully",
            token,
            user:{
                userId:user._id,
                username:user.username,
                email:user.email
            }
        })
    }catch (error){
        res.status(500).json({
            message:"Server error"
        })
    }
})

module.exports = router;