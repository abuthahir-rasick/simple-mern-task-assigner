import React from 'react'

const EmployeeRegister = ({ name, setName, email, password, setEmail, setPassword, handleRegister }) => {
  return (
    <div className="flex justify-center items-center w-full px-2 py-4 sm:py-8">
      
      <form 
        onSubmit={handleRegister} 
        className="w-full max-w-md bg-white shadow-2xl shadow-slate-200 rounded-3xl p-6 sm:p-10 border border-slate-50 transition-all"
      > 
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 rounded-2xl mb-4">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Add Employee
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">
            Create new team credentials
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder='Full Name' 
              required
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </span>
            <input 
              type='email' 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder='Email Address' 
              required
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50"
            />
          </div>

          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            <input 
              type='password' 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder='Temporary Password' 
              required
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50"
            />
          </div>
        </div>

        <button 
          type='submit'
          className="cursor-pointer w-full mt-8 bg-indigo-600 text-white py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all duration-200 uppercase tracking-wider"
        >
          Register Employee
        </button>

        <p className="text-center text-[10px] sm:text-xs text-slate-400 mt-6">
          Authorized manager access only
        </p>
      </form>   
    </div>
  )
}

export default EmployeeRegister