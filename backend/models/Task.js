const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:String,
    desc:String,
    managerId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    employeeId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    status:{
        type:String,
        enum:['Created','Reviewed','Rejected'],
        default:'Created'
    }
})

module.exports=mongoose.model('Task',taskSchema);