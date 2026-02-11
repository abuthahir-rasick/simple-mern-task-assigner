import api from "../../api";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTaskList=createAsyncThunk(
    'employee/task/fetch',
    async(_,thunkApi)=>{
       try {
         const res=await api.get('/employee/task');
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)

export const addTask=createAsyncThunk(
    '/manager/task',
    async(data,thunkApi)=>{
        try {
         const res=await api.post('/manager/task',data);
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)

export const mfetchTaskList=createAsyncThunk(
    'manager/task/fetch',
    async(_,thunkApi)=>{
       try {
         const res=await api.get('/manager/task');
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)

export const reviewTask=createAsyncThunk(
    '/task/review',
    async(id,thunkApi)=>{
       try {
         const res=await api.post(`/employee/review/${id}`);
        return res.data.task;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)

export const managerDecision=createAsyncThunk(
    '/task/decision',
    async({id,action},thunkApi)=>{
       try {
         const res=await api.post(`/manager/task/${id}/${action}`);
        return {id,action,task:res.data.task};
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)
export const employeeList=createAsyncThunk(
    '/manager/employees',
    async(_,thunkApi)=>{
       try {
         const res=await api.get('/manager/employees');
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)
export const updateTask = createAsyncThunk(
    'manager/update',
    async ({id,title,desc},thunkApi)=>{
        try {
            const res=await api.put(`/manager/task/${id}`,{title,desc});
            return res.data.task;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)

const taskSlice=createSlice({
    name:'tasks',
    initialState:{
        list:[],
        loading:false,
        error:null
    },
    reducers:{
        clearTasks:(state)=>{
            state.list=[];
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTaskList.pending,(state)=>{
                    state.loading=true
        })
        .addCase(fetchTaskList.fulfilled,(state,action)=>{
                    state.loading=false
                    const sortedTask=action.payload.task.sort((a,b)=>{
                const numA = parseInt(a.title.match(/\d+/)?.[0] || 0);
                const numB= parseInt(b.title.match(/\d+/)?.[0] || 0);
                return numA-numB
                    })
                    state.list=sortedTask
        })
        .addCase(fetchTaskList.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(addTask.pending,(state)=>{
                    state.loading=true
        })
        .addCase(addTask.fulfilled,(state,action)=>{
                    state.loading=false
                    state.list=action.payload
        })
        .addCase(addTask.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(mfetchTaskList.pending,(state)=>{
                    state.loading=true
        })
        .addCase(mfetchTaskList.fulfilled,(state,action)=>{
                    state.loading=false
                    const sortedTask=action.payload.tasks.sort((a,b)=>{
                const numA = parseInt(a.title.match(/\d+/)?.[0] || 0);
                const numB= parseInt(b.title.match(/\d+/)?.[0] || 0);
                return numA-numB
                    })
                    state.list=sortedTask
        })
        .addCase(mfetchTaskList.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(reviewTask.pending,(state)=>{
                    state.loading=true
        })
        .addCase(reviewTask.fulfilled,(state,action)=>{
                    state.loading=false
                    const index=state.list.findIndex(t=>t._id===action.payload._id);
                    if(index!==-1){
                        state.list[index]=action.payload
                    }
        })
        .addCase(reviewTask.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(managerDecision.pending,(state)=>{
                    state.loading=true
        })
        .addCase(managerDecision.fulfilled,(state,action)=>{
                    state.loading=false
                    const {id,action:act,task}=action.payload;
                    if(act==='ok'){
                        state.list=state.list.filter(t=>t._id!==id)
                    }
                    if(act==='notOk'){
                        const index=state.list.findIndex(t=>t._id===id);
                        if(index!==-1){
                            state.list[index]=task
                        }
                    }       
        })
        .addCase(managerDecision.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(updateTask.pending,(state)=>{
                    state.loading=true
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
                    state.loading=false
                    const index=state.list.findIndex((s)=>s._id===action.payload._id);
                    if(index!==-1){
                        state.list[index]=action.payload
                    }
        })
        .addCase(updateTask.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
    }
})

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;