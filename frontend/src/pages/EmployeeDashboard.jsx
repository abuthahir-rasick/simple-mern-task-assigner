import React from 'react'
import { useEffect } from 'react';
import { fetchTaskList, reviewTask } from '../features/tasks/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeDashboard = () => {
    const dispatch=useDispatch();
    const {list,error}=useSelector(state=>state.tasks);
    
    useEffect(()=>{
        dispatch(fetchTaskList());
    },[dispatch])
  return (
    <div className="w-full mx-auto px-4 py-6">
      {list.length>0?(<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map(t=>(
        <div className="bg-red-50 border-red-200 rounded-xl shadow-sm p-4 hover:shadow-md transition" key={t._id}>
            <h4 className="text-2xl font-bold mb-1">{t.title}</h4>
            <p className="mb-3">{t.desc}</p>
            <div>
            <button 
            className={`px-3 py-1.5 text-sm rounded-lg transition
                ${t.status === "Reviewed"? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700"}`}
            disabled={t.status==='Reviewed'} onClick={()=>dispatch(reviewTask(t._id))}>Review</button>
            </div>
        </div>
      ))}
      </div>):(<div className="text-center text-gray-500 mt-10 text-sm">No task assigned for you</div>)}
    </div>
  )
}

export default EmployeeDashboard
