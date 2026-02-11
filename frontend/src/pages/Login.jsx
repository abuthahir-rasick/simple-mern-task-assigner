import React from 'react'
import { login, register } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../components/Modal';
import { Eye,EyeOff } from 'lucide-react';


const Login = () => {
    const dispatch=useDispatch();
    const [modal, setModal] = useState({ show: false, title: '', message: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [loginMode,setLoginMode]=useState(true)
    const navigate=useNavigate();
    const {token,role,error}=useSelector(state=>state.auth);
    
    useEffect(()=>{
        if(token&&role){
            navigate(role==='manager'?'/manager':'/employee')
        }
    },[token,role])
    useEffect(() => {
  if (error) {
    setModal({
      show: true,
      title: 'Error',
      message: error
    });
  }
}, [error]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if(loginMode){
            await dispatch(login({email,password})).unwrap();
            setEmail('');setPassword('')
      setModal({ show: true, title: 'Success', message: 'User logged in successfully' });
        }
        else{
            await dispatch(register({email,password})).unwrap();
            setEmail('');setPassword('')
            setLoginMode(true);
      setModal({ show: true, title: 'Success', message: 'Uset registered successfully' });
        }
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
        <form 
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 md:p-8">
            <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">{loginMode?'Login':'Register'}</h4>
            <div className="mb-4">
                <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            </div>
            
            <div className="mb-5 relative">
                 <input type={showPassword ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' required
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
                 <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
             {showPassword ? (<EyeOff className="w-5 h-5" />) : (<Eye className="w-5 h-5" />)}</button>
            </div>
           
             <button type='submit'
             className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition">
                {loginMode?'Login':'Register'}</button>
             <p className="text-center text-sm text-indigo-600 hover:text-indigo-800 mt-4 cursor-pointer transition" 
              onClick={()=>setLoginMode(!loginMode)}>
                {loginMode?'create new account':'already have an account'}
             </p>
        </form>   
     <Modal
        show={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
        title={modal.title}
        message={modal.message}
      />
    </div>
  )
}

export default Login
