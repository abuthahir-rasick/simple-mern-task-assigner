const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const auth = require('../middleware/auth');

const router=express.Router();

router.post('/register',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const hashed= await bcrypt.hash(password,10);
        const user=await User.create({
            email,
            password:hashed,
            role:'manager'
        })
        res.status(201).json({
            success:true,
            message:'user registered',
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'user register failed',
            error
        })
    }
})
router.post('/eRegister',auth,async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const hashed= await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashed,
            role:'employee'
        })
        res.status(201).json({
            success:true,
            message:'user registered',
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'user register failed',
            error
        })
    }
})
router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User not found'
            })

        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:'Invalid credentials'
            })
        }
        const token=jwt.sign({
            id:user._id,role:user.role
        },"SECRET");
        res.status(200).json({
            success:true,
            message:'user signed in',
            token,
            user,
            role:user.role
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'something wrong',
            error
        })
    }
})
module.exports=router;