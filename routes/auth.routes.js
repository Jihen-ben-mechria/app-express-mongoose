const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user = new User({name,email,password})
        await user.save()
        res.status(201).send({message:"user saved successfully",user})
    
    
    } catch (error) {
        res.status(500).send({message:error.message})
        
    }
    


})

router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await User.findOne({email:email})
        if(!user) {
            res.status(404).send({message:'user not found'})
        }
        const isHavePassword = user.comparePassword(password)
        if(!isHavePassword) {
            res.status(400).send({message:'invalid credentials'})
        }
        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY)
        res.send({message:'user logged in successfully',token})
    } catch (error) {
        res.status(400).send({message:error.message})
        
    }


})

















module.exports = router