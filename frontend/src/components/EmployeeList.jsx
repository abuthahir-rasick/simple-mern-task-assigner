import React from 'react'
import UpdateEmployeeModal from './UpdateEmployeeModal'

const EmployeeList = ({list,handleUpdate,handleDelete,selectedEmployee,setSelectedEmployee,taskEmployee,setTaskEmployee,handleSave,loading}) => {
    
  return (
   <div className="w-full mt-8">
    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Employees List</h3>
        {list.length===0?(<p className="text-gray-500 text-center">No Employees in your team</p>):(
            <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table border="1" className="min-w-full border border-gray-200 text-sm md:text-base">
                <thead className="bg-indigo-600 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left w-[23px]">Select</th>
                        <th className="px-4 py-2 text-left w-[23px]">Name</th>
                        <th className="px-4 py-2 text-left w-[23px]">Email Id</th>
                        <th className="px-4 py-2 text-center w-[23px]">Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {list.map(employee=>(
                        <tr key={employee._id}  className="border-b hover:bg-gray-50 transition">
                            <td className="px-4 py-2 w-[23px]">
                                <input type='radio' name='taskEmployee' checked={taskEmployee?._id===employee._id}
                                onChange={()=>setTaskEmployee(employee)}
                                className="accent-indigo-600 cursor-pointer"/>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-800 w-[23px]">{employee.name}</td>
                            <td className="px-4 py-2 text-gray-800 w-[23px]">{employee.email}</td>
                            <td className="px-4 py-2 text-center w-[23px]">
                                <div className="flex gap-8 justify-center">
                                <button onClick={()=>handleUpdate(employee)}
                                    className="cursor-pointer px-3 py-1 text-xs md:text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Update</button>
                                <button onClick={()=>handleDelete(employee._id)}
                                className="cursor-pointer px-3 py-1 text-xs md:text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
                        </div>
                        </td>
                                </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )}
         {selectedEmployee &&(
                <UpdateEmployeeModal
                employee={selectedEmployee}
                onClose={()=>setSelectedEmployee(null)}
                onSave={handleSave}
                loading={loading}
                />
            )}
          </div>
  ) 
}

export default EmployeeList
