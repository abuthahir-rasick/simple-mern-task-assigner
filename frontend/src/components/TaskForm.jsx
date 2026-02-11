import React from 'react'
import { useState } from 'react';

const TaskForm = ({employee,title,setTitle,desc,setDesc,handleSubmit,onClose,mode}) => {
    
    
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 animate-fadeIn">
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">
          {mode === "edit"? `Edit Task for: ${employee?.name}` : `Assign Task to: ${employee?.name}`}</h4>
      
      <form onSubmit={(e)=>handleSubmit(e,employee)} className="space-y-3">
            
            <input  value={title} onChange={e=>setTitle(e.target.value)} placeholder='Enter Title' required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            <input  value={desc} onChange={e=>setDesc(e.target.value)} placeholder='Enter Description' required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
             <button type='submit'
             className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">{mode === "edit" ? "Update Task" : "Add Task"}</button>
              <button type="button" onClick={onClose}
              className="cursor-pointer w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              </div>
        </form>   
    </div>
    </div>
  )
}

export default TaskForm
