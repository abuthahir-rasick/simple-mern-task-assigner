import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/tasks/taskSlice";
import { configureStore } from '@reduxjs/toolkit';



export const store=configureStore({
    reducer:{
        auth:authReducer,
        tasks:taskReducer
    }
})