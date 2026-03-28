import React, { useState } from 'react';
import { login, register } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'; 
import { Eye, EyeOff, ShieldCheck, Mail, Lock } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [modal, setModal] = useState({ show: false, title: '', message: '', isError: false });
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMode, setLoginMode] = useState(true);
  
  const { token, role } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginMode) {
        await dispatch(login({ email, password })).unwrap();
        setEmail('');
        setPassword('');
        setModal({ show: true, title: 'Success', message: 'Logged in successfully', isError: false });
      } else {
        await dispatch(register({ email, password })).unwrap();
        setEmail('');
        setPassword('');
        setLoginMode(true);
        setModal({ show: true, title: 'Success', message: 'Account created successfully', isError: false });
      }
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : error?.message || 'Invalid credentials. Please try again.';
      setModal({ show: true, title: 'Error', message: errorMessage, isError: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-gradient-to-br from-indigo-700 via-violet-600 to-purple-800 px-4 py-10">
      
      <div className="bg-white w-full max-w-[360px] sm:max-w-md rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border border-white/20 transition-all duration-300">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
          </div>
          <h4 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
            {loginMode ? 'Welcome Back' : 'Create Account'}
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
            Task Assigner Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full pl-11 pr-4 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-11 pr-12 py-3 sm:py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-xl shadow-indigo-200 active:scale-[0.98] transition-all cursor-pointer mt-2"
          >
            {loginMode ? 'Sign In' : 'Join Now'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
            {loginMode ? "Don't have an account?" : "Already a member?"}
          </p>
          <button
            type="button"
            className="mt-1 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer outline-none underline decoration-indigo-200 underline-offset-4"
            onClick={() => setLoginMode(!loginMode)}
          >
            {loginMode ? 'Create New Account' : 'Login to Workspace'}
          </button>
        </div>
      </div>

      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        isError={modal.isError}
        onClose={() => {
          setModal({ ...modal, show: false });
          if (!modal.isError && token && role) {
            navigate(role === 'manager' ? '/manager' : '/employee');
          }
        }}
      />
    </div>
  );
};

export default Login;