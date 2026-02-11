const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const authRoutes=require('./routes/authRoutes');
const employeeRoutes=require('./routes/employeeRoutes');
const managerRoutes=require('./routes/managerRoutes');
require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(express.json());

 mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err));

app.use('/auth',authRoutes);
app.use('/employee',employeeRoutes);
app.use('/manager',managerRoutes);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`)
})