import React, { useState } from 'react'

const UpdateEmployeeModal = ({ employee, onClose, onSave, loading }) => {
    const [formData, setFormData] = useState({
        name: employee.name,
        email: employee.email,
        password: employee.password,
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSave = (e) => {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" 
                onClick={onClose}
            ></div>

            <div className="relative bg-white w-full max-w-[340px] sm:max-w-md rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in slide-in-from-bottom-4">
                
                <div className="bg-slate-50/50 p-6 sm:p-8 text-center border-b border-slate-100">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-2xl mb-4 text-amber-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Update Profile</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                        Editing: <span className="text-indigo-600">{employee.name}</span>
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-4">
                    
                    {/* Name Field */}
                    <div className="relative group">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </span>
                        <input 
                            name="name" 
                            value={formData.name} 
                            placeholder='Full Name' 
                            onChange={handleChange} 
                            required
                            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50" 
                        />
                    </div>

                    <div className="relative group">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </span>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            placeholder='Email Address' 
                            onChange={handleChange} 
                            required
                            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50" 
                        />
                    </div>

                    <div className="relative group">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            placeholder='Password' 
                            onChange={handleChange} 
                            required
                            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-slate-50/50" 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="cursor-pointer w-full bg-indigo-600 text-white py-3.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Save Changes'}
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

export default UpdateEmployeeModal