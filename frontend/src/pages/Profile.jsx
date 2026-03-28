import React from 'react'
import { useSelector } from 'react-redux';
import { User, Shield, Activity, Mail } from 'lucide-react';

const Profile = () => {
    const { role, user } = useSelector(state => state.auth);

    const displayName = user?.user?.name 
        ? user.user.name.charAt(0).toUpperCase() + user.user.name.slice(1).toLowerCase() 
        : role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase();

    const userInitial = user?.user?.name ? user.user.name[0].toUpperCase() : role?.[0]?.toUpperCase();

    return (
        <div className='min-h-[calc(100vh-60px)] bg-slate-50/50 flex items-center justify-center px-4 py-10'>
            
            <div className='bg-white w-full max-w-[360px] sm:max-w-md rounded-[3rem] shadow-2xl shadow-slate-200 p-8 sm:p-12 border border-white relative overflow-hidden'>
                
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-violet-500 opacity-10"></div>

                <div className="flex flex-col items-center relative z-10">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-xl shadow-indigo-200 border-4 border-white">
                        {userInitial}
                    </div>

                    <div className="text-center mt-6">
                        <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
                            {displayName}
                        </h2>
                        <div className="flex items-center justify-center gap-1.5 mt-1 text-slate-400">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                            <p className="text-[10px] sm:text-sm font-medium">{user?.user?.email || 'no-email@workspace.com'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 space-y-4">
                    <div className="flex items-center justify-between bg-slate-50/80 px-5 py-4 rounded-2xl border border-slate-100 transition-hover hover:bg-slate-100/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Shield className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Account Role</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                            {role?.toUpperCase()}
                        </span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50/80 px-5 py-4 rounded-2xl border border-slate-100 transition-hover hover:bg-slate-100/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Activity className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">Login Status</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-xs sm:text-sm font-bold text-emerald-600">Active Now</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3">
                    <button 
                        disabled 
                        className="cursor-not-allowed w-full bg-slate-100 text-slate-400 py-3.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-slate-200 transition-all opacity-80"
                    >
                        Edit Profile
                    </button>
                    <button 
                        disabled 
                        className="cursor-not-allowed w-full bg-white text-slate-400 py-3.5 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest border border-slate-200 transition-all opacity-80"
                    >
                        Security Settings
                    </button>
                    <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-tighter mt-2">
                        Profile modifications are managed by admin
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default Profile