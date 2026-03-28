import React from 'react'

const TaskForm = ({ employee, title, setTitle, desc, setDesc, handleSubmit, onClose, mode }) => {
    
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-[340px] sm:max-w-md rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in slide-in-from-bottom-4">
        
        <div className="bg-slate-50/50 p-6 sm:p-8 text-center border-b border-slate-100">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl mb-4 text-indigo-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h4 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">
            {mode === "edit" ? "Update Task" : "Assign New Task"}
          </h4>
          <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
            For: <span className="text-indigo-600">{employee?.name}</span>
          </p>
        </div>
      
        <form onSubmit={(e) => handleSubmit(e, employee)} className="p-6 sm:p-8 space-y-4">
            
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </span>
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder='Task Title' 
                required
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/30"
              />
            </div>

            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </span>
              <input 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                placeholder='Task Description' 
                required
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/30"
              />
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <button 
                type='submit'
                className="cursor-pointer w-full bg-indigo-600 text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 active:scale-[0.97] transition-all uppercase tracking-wider"
              >
                {mode === "edit" ? "Update Details" : "Confirm Assignment"}
              </button>
              
              <button 
                type="button" 
                onClick={onClose}
                className="cursor-pointer w-full bg-white text-slate-500 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-50 border border-slate-200 active:scale-[0.97] transition-all"
              >
                Cancel
              </button>
            </div>
        </form>   
      </div>
    </div>
  )
}

export default TaskForm