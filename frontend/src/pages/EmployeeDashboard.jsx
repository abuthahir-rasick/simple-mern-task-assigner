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
        <div className="min-h-[calc(100vh-60px)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Your Tasks
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                        Manage your assigned duties and submit them for manager review.
                    </p>
                </div>

                {list.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {list.map(t => (
                            <div 
                                key={t._id} 
                                className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="p-5 sm:p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            t.status === "Reviewed" 
                                            ? "bg-green-100 text-green-800" 
                                            : "bg-amber-100 text-amber-800"
                                        }`}>
                                            {t.status === "Reviewed" ? "✓ Submitted" : "● Pending"}
                                        </span>
                                    </div>

                                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {t.title}
                                    </h4>
                                    
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
                                        {t.desc}
                                    </p>
                                </div>

                                {/* Card Footer / Action */}
                                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
                                    <button 
                                        onClick={() => dispatch(reviewTask(t._id))}
                                        disabled={t.status === 'Reviewed'}
                                        className={`w-full flex justify-center items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                                            ${t.status === "Reviewed" 
                                                ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 cursor-pointer"
                                            }`}
                                    >
                                        {t.status === 'Reviewed' ? 'Under Review' : 'Mark as Done'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No tasks assigned</h3>
                        <p className="mt-1 text-sm text-gray-500">You're all caught up for today!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;