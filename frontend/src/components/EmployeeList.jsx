import React from 'react';
import UpdateEmployeeModal from './UpdateEmployeeModal';

const EmployeeList = ({ list, handleUpdate, handleDelete, selectedEmployee, setSelectedEmployee, taskEmployee, setTaskEmployee, handleSave, loading }) => {

    return (
        <div className="w-full mt-10">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    Team Members
                </h3>
                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                    {list.length} Total
                </span>
            </div>

            {list.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
                    <p className="text-gray-400 font-medium italic">No employees assigned to your team yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-gray-100">
                                    <th className="px-4 py-4 text-left text-[10px] sm:text-xs uppercase tracking-wider font-bold text-gray-500 w-16">
                                        Select
                                    </th>
                                    <th className="px-4 py-4 text-left text-[10px] sm:text-xs uppercase tracking-wider font-bold text-gray-500">
                                        Employee Name
                                    </th>
                                    <th className="px-4 py-4 text-left text-[10px] sm:text-xs uppercase tracking-wider font-bold text-gray-500 hidden sm:table-cell">
                                        Email Address
                                    </th>
                                    <th className="px-4 py-4 text-center text-[10px] sm:text-xs uppercase tracking-wider font-bold text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {list.map((employee) => (
                                    <tr 
                                        key={employee._id} 
                                        className={`group hover:bg-indigo-50/30 transition-colors duration-200 ${taskEmployee?._id === employee._id ? 'bg-indigo-50/50' : ''}`}
                                    >
                                        <td className="px-4 py-4 text-center">
                                            <div className="relative flex items-center justify-center">
                                                <input 
                                                    type='radio' 
                                                    name='taskEmployee' 
                                                    checked={taskEmployee?._id === employee._id}
                                                    onChange={() => setTaskEmployee(employee)}
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm md:text-base font-bold text-gray-800">
                                                    {employee.name}
                                                </span>
                                                <span className="text-[10px] text-gray-500 sm:hidden">
                                                    {employee.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 hidden sm:table-cell">
                                            {employee.email}
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2 sm:gap-4">
                                                <button 
                                                    onClick={() => handleUpdate(employee)}
                                                    className="p-2 text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 active:scale-95 transition-all cursor-pointer"
                                                    title="Update Employee"
                                                >
                                                    <span className="text-xs font-bold px-1">Edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(employee._id)}
                                                    className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 active:scale-95 transition-all cursor-pointer"
                                                    title="Delete Employee"
                                                >
                                                    <span className="text-xs font-bold px-1">Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {selectedEmployee && (
                <UpdateEmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onSave={handleSave}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default EmployeeList;