import React, { useEffect } from 'react';
import { fetchTaskList, reviewTask } from '../features/tasks/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeDashboard = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTaskList());
    }, [dispatch]);

    return (
        <div className="min-h-[calc(100vh-90px)] bg-slate-50/50 py-6 sm:py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                
                <div className="mb-10 text-center sm:text-left">
                    <h2 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">
                        Workplace Tasks
                    </h2>
                    <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                        Review your assignments and track progress
                    </p>
                </div>

                {list.length > 0 ? (
                    <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map(t => (
                            <div 
                                key={t._id} 
                                className="group bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                                <div className="p-6 sm:p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                                            t.status === "Reviewed" 
                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                            : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${t.status === "Reviewed" ? "bg-emerald-500" : "bg-indigo-500 animate-pulse"}`}></span>
                                            {t.status === "Reviewed" ? "In Review" : "Active"}
                                        </span>
                                    </div>

                                    <h4 className="text-base sm:text-lg font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                                        {t.title}
                                    </h4>
                                    
                                    <p className="text-[11px] sm:text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
                                        {t.desc}
                                    </p>
                                </div>

                                <div className="px-6 py-5 bg-slate-50/50 border-t border-slate-50">
                                    <button 
                                        onClick={() => dispatch(reviewTask(t._id))}
                                        disabled={t.status === 'Reviewed'}
                                        className={`w-full flex justify-center items-center gap-2 px-4 py-3 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-200 active:scale-95
                                            ${t.status === "Reviewed" 
                                                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 cursor-pointer"
                                            }`}
                                    >
                                        {t.status === 'Reviewed' ? (
                                            <>
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                                                Submitted
                                            </>
                                        ) : (
                                            'Mark for Review'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm px-6 text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-800">Clear Schedule</h3>
                        <p className="mt-2 text-[11px] sm:text-sm text-slate-400 font-bold uppercase tracking-widest">No tasks assigned to you right now</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;