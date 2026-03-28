import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logout } from '../features/auth/authSlice';
import { clearTasks } from '../features/tasks/taskSlice';

const Header = () => {
  const { role } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handlelogout = () => {
    dispatch(logout());
    dispatch(clearTasks());
    setOpen(false);
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className='sticky top-0 z-[100] bg-indigo-600 text-white px-4 py-3 sm:px-8 sm:py-4 shadow-xl flex items-center justify-between transition-all'>
       
       {/* Responsive Logo/Title */}
       <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
          <div className='bg-white text-indigo-600 p-1.5 rounded-lg shadow-inner hidden sm:block'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          <h3 className='text-sm sm:text-lg md:text-xl font-black tracking-tight leading-tight'>
            <span className='sm:hidden uppercase tracking-widest'>Task Assigner</span>
            <span className='hidden sm:inline'>Task Assigner Project <span className='font-light opacity-80'>| MERN</span></span>
          </h3> 
       </div>

       {role && (
        <div className='relative' ref={dropdownRef}>
          {/* User Profile Trigger */}
          <button 
            onClick={() => setOpen(!open)}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 outline-none
              ${open ? 'bg-white text-indigo-600 shadow-lg' : 'bg-indigo-500/40 hover:bg-indigo-500'}`}
          >
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs border transition-colors
              ${open ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white text-indigo-600 border-white'}`}>
              {role.charAt(0).toUpperCase()}
            </div>
            <span className='text-[10px] sm:text-xs font-black uppercase tracking-widest hidden xs:block'>
              {role}
            </span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Premium Dropdown Menu */}
          {open && (
            <div className='absolute right-0 mt-3 w-44 sm:w-52 bg-white text-slate-700 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[110] animate-in fade-in slide-in-from-top-2 duration-200'>
              <div className='px-4 py-3 bg-slate-50 border-b border-slate-100'>
                <p className='text-[9px] uppercase tracking-widest font-black text-slate-400'>Current Session</p>
                <p className='text-xs font-bold text-indigo-600 capitalize'>{role} Account</p>
              </div>

              <div className='p-1.5'>
                <button 
                  onClick={() => { navigate('/profile'); setOpen(false); }} 
                  className='flex items-center gap-3 w-full text-left px-3 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all cursor-pointer group'
                >
                  <svg className="w-4 h-4 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Your Profile
                </button>
                
                <div className='h-px bg-slate-100 my-1 mx-2'></div>

                <button 
                  onClick={handlelogout} 
                  className='flex items-center gap-3 w-full text-left px-3 py-2 text-xs sm:text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer group'
                >
                  <svg className="w-4 h-4 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
       )}
    </header>
  )
}

export default Header