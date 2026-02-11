const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const authRoutes=require('./routes/authRoutes');
const employeeRoutes=require('./routes/employeeRoutes');
const managerRoutes=require('./routes/managerRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/task-assigner')
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err));

app.use('/auth',authRoutes);
app.use('/employee',employeeRoutes);
app.use('/manager',managerRoutes);

const port=5000;
app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`)
})