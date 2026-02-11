import React from 'react'

const EmployeeRegister = ({name,setName,email,password,setEmail,setPassword,handleRegister}) => {
  return (
    <div className="flex justify-center items-center w-full py-6">
      
         <form onSubmit={handleRegister} className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8"> 
            <h2 className="text-xl md:text-2xl font-bold text-center text-indigo-600 mb-6">Employee Register</h2>
            <div className="space-y-4">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder='Name' required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            <input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
            </div>
             <button type='submit'className="cursor-pointer w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">Register</button>
        </form>   
    </div>
  )
}

export default EmployeeRegister
