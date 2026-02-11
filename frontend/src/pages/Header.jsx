import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logout } from '../features/auth/authSlice';
import { clearTasks } from '../features/tasks/taskSlice';

const Header = () => {
  const {role}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const [open,setOpen]=useState(false);
  const navigate=useNavigate();
  const dropdownRef = useRef(null);
  const handlelogout=()=>{
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='bg-indigo-600 text-white px-4 py-3 shadow-md flex items-center justify-between'>
       <h3 className='text-lg md:text-xl font-semibold '>Task Assigner Project with Mern Stack</h3> 
       {role && (
        <div className='relative' ref={dropdownRef}>
          <button onClick={()=>setOpen(!open)}
            className='cursor-pointer flex items-center gap-2 bg-indigo-500 hover:bg-indigo-700 px-3 py-1.5 rounded-full transition'>
            <span className='text-sm font-medium'>{role.toUpperCase()}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            </button>
          {open && (
            <div className='absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden z-50'>
              <p className='px-4 py-2 text-xs bg-gray-100'>Role:<span className='font-semibold'>{role}</span></p>
              <button onClick={()=>navigate('/profile')} className='cursor-pointer w-full text-left px-4 py-2 hover:bg-indigo-50'>profile</button>
              <button onClick={handlelogout} className='cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'>logout</button>
            </div>
          )}

        </div>
       )}
    </div>
  )
}

export default Header