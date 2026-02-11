import api from "../../api"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const register=createAsyncThunk(
    '/auth/register',
    async(data,thunkApi)=>{
       try {
         const res=await api.post('/auth/register',data);
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)

export const eRegister=createAsyncThunk(
    '/auth/eRegister',
    async(data,thunkApi)=>{
       try {
         const res=await api.post('/auth/eRegister',data);
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)


export const login=createAsyncThunk(
    '/auth/login',
    async(data,thunkApi)=>{
       try {
         const res=await api.post('/auth/login',data);
        return res.data;
       } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data?.message);
       }
    }
)
export const getEmployees=createAsyncThunk(
    'manager/employees',
    async(_,thunkApi)=>{
        try {
            const res=await api.get('/manager/getEmployees');
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const updateEmployee = createAsyncThunk(
    'employee/update',
    async ({id,data},thunkApi)=>{
        try {
            const res=await api.put(`/manager/employee/${id}`,data);
            return res.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)
export const deleteEmployee=createAsyncThunk(
    'employee/delete',
    async (id,thunkApi)=>{
        try {
            await api.delete(`/manager/employee/${id}`);
            return id;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message)
        }
    }
)

const authSlice=createSlice({
    name:'auth',
    initialState:{
        role:localStorage.getItem('role') || null,
        token:localStorage.getItem('token')||null,
        loading:false,
        error:null,
        registerSuccess:false,
        eRegisterSuccess:false,
        list:[],
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    reducers:{
        logout:(state)=>{
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            state.role=null;
            state.list=[];
            state.error=null;
            state.token=null;
            state.user=null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
                    state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
                    state.loading=false
                    state.role=action.payload.role
                    state.token=action.payload.token
                    state.user=action.payload
                    localStorage.setItem('token',action.payload.token)
                    localStorage.setItem('role',action.payload.role);
                    localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(login.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(register.pending,(state)=>{
                    state.loading=true
                    state.registerSuccess=false
        })
        .addCase(register.fulfilled,(state,action)=>{
                    state.loading=false
                    state.registerSuccess=true
        })
        .addCase(register.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(eRegister.pending,(state)=>{
                    state.loading=true
                    state.eRegisterSuccess=false
        })
        .addCase(eRegister.fulfilled,(state,action)=>{
                    state.loading=false
                    state.eRegisterSuccess=true
        })
        .addCase(eRegister.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(getEmployees.pending,(state)=>{
                                state.loading=true
                    })
        .addCase(getEmployees.fulfilled,(state,action)=>{
                                state.loading=false
                                state.list=action.payload.employees
                    })
        .addCase(getEmployees.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })        
        .addCase(updateEmployee.pending,(state)=>{
                                        state.loading=true
                    })
        .addCase(updateEmployee.fulfilled,(state,action)=>{
                    state.loading=false
                    const index=state.list.findIndex((s)=>s._id===action.payload._id);
                    state.list[index]=action.payload.employee
                    })
        .addCase(updateEmployee.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
        .addCase(deleteEmployee.pending,(state)=>{
                                        state.loading=true
                    })
        .addCase(deleteEmployee.fulfilled,(state,action)=>{
                                        state.loading=false
                                        state.list=state.list.filter((s)=>s._id!==action.payload)
                 })
        .addCase(deleteEmployee.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
        })
    }
})

export const {logout}=authSlice.actions;
export default authSlice.reducer;