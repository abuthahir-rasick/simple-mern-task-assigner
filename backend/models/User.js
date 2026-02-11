const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String,enum:['manager','employee']},
    managerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})

module.exports=mongoose.model('User',userSchema);