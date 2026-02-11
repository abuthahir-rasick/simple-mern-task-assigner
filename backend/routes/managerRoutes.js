const express=require('express');
const bcrypt=require('bcryptjs');
const User=require('../models/User');
const Task=require('../models/Task');
const auth = require('../middleware/auth');

const router=express.Router();

router.post('/employee',auth,async(req,res)=>{
    try {
        const {email,password}=req.body;
        const hashed=await bcrypt.hash(password,10);
        const user=await User.create({
            email,
            password:hashed,
            role:'employee',
            managerId:req.user.id
        })
        res.status(201).json({
            success:true,
            message:'employee created',
            user
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:'employee creation failed',
            error
        })
    }
})

router.post('/task',auth,async(req,res)=>{
    try {
        const {title,desc,email}=req.body;
        const employer=await User.findOne({email,role:'employee'})
        if(!employer){
            return res.status(400).json({
            success:false,
            message:'employer not found'
        })
        }
        const task=await Task.create({
            title,
            desc,
            employeeId:employer._id,
            managerId:req.user.id
        })
        res.status(201).json({
            success:true,
            message:'task created',
            task
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'task creation failed',
            error
        })
    }
})
router.get('/task',auth,async(req,res)=>{
    try {
        const tasks = await Task.find({ managerId: req.user.id }).populate('employeeId', 'name email');
        res.status(200).json({
            success:true,
            message:'task fetched',
            tasks
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'task fetching failed',
            error
        })
    }
})
router.post('/task/:id/:action',auth,async(req,res)=>{
    try {
        const {id,action}=req.params;
    if(action==='ok'){
        await Task.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:'task finished',
        })
    }
    if(action==='notOk'){
        const task=await Task.findByIdAndUpdate(id,{status:'Rejected'},{new:true}).populate('employeeId', 'name email');
        res.status(200).json({
            success:true,
            message:'task rejected',
            task
        })
    }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'something wrong check action, status and id',
            error
        })
    }
})
router.get('/getEmployees',auth,async(req,res)=>{
    try {
        
        const employees=await User.find({role:'employee'});
        res.status(200).json({
            success:true,
            message:'employees-list',
            employees
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'fetch-employees-failed',
            error
        })
    }
})
router.put('/employee/:id',auth,async(req,res)=>{
    try {
        const {id}=req.params;
    const {name,email,password}=req.body;
    
    const employee =await User.findOne({_id:id,role:'employee'});
    if(!employee){
        return res.status(400).json({
            success:false,
            message:'employee not found'
        })
    }
    const hashed= await bcrypt.hash(password,10);
    employee.name=name||employee.name
    employee.email=email||employee.email
    employee.password=hashed||employee.password
    await employee.save();
    res.status(200).json({
        success:true,
        message:'employee updated',
        employee
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'employee update failed',
            error
        })
    }
})
router.delete('/employee/:id',auth,async(req,res)=>{
    try {
        const {id}=req.params;
    await Task.deleteMany({ employeeId: id });
    const employee =await User.findOneAndDelete({_id:id,role:'employee'});
    if(!employee){
        return res.status(400).json({
            success:false,
            message:'employee not found'
        })
    }
    
    res.status(200).json({
        success:true,
        message:'employee deleted',
        
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'employee delete failed',
            error
        })
    }
})
router.put('/task/:id',auth,async(req,res)=>{
    try {
        const {id}=req.params;
    const {title,desc}=req.body;
    
    const task =await Task.findByIdAndUpdate(id,{title,desc},{new:true});
    if(!task){
        return res.status(400).json({
            success:false,
            message:'task not found'
        })
    }
    
    
    res.status(200).json({
        success:true,
        message:'task updated',
        task
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'task update failed',
            error
        })
    }
})
module.exports=router