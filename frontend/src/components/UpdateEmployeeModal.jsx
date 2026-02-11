import React, { useState } from 'react'

const UpdateEmployeeModal = ({employee,onClose,onSave,loading}) => {
    const [formData,setFormData]=useState({
            name:employee.name,
            email:employee.email,
            password:employee.password,
        })
        const handleChange=(e)=>{
            setFormData({...formData,[e.target.name]:e.target.value})
        }
        const handleSave=(e)=>{
            e.preventDefault();
            onSave(formData);
        }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 text-center">Update Employee</h3>
            <form onSubmit={handleSave} className="space-y-3">
                <input name="name" value={formData.name} placeholder='Name' onChange={handleChange} required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="email" name="email" value={formData.email} placeholder='Email' onChange={handleChange} required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="password" name="password" value={formData.password} placeholder='Password' onChange={handleChange} required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                
                <div className="flex justify-between gap-3 pt-3">
                    <button type="submit" disabled={loading}
                    className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60">{loading?'Updating...':'Update'}</button>
                    <button type="button" onClick={onClose} 
                    className="cursor-pointer w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateEmployeeModal

