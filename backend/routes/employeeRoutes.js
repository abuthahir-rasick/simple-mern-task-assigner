const express=require('express');
const Task=require('../models/Task');
const auth = require('../middleware/auth');

const router=express.Router();

router.get('/task',auth,async(req,res)=>{
    try {
        const task=await Task.find({employeeId:req.user.id});
        res.status(200).json({
            success:true,
            message:'Task list',
            task
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:'Task list failed',
            error
        })
    }
})
router.post('/review/:id',auth,async(req,res)=>{
    try {
        const task=await Task.findByIdAndUpdate(req.params.id,{status:'Reviewed'},{new:true});
        res.status(201).json({
            sucess:true,
            message:'Reviewed',
            task
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Not Reviewed',
            error
        })
    }
})

module.exports=router;