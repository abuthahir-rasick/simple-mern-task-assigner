import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
    const {role,user}=useSelector(state=>state.auth);
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <div className='bg-white w-full max-w-md rounded-2xl shadow-lg p-6 md:p-8'>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.user?.name ? user.user.name[0].toUpperCase() : role?.[0]?.toUpperCase()}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-gray-800">{user?.user?.name ? user.user.name.charAt(0).toUpperCase() + user.user.name.slice(1).toLowerCase() : 
            role?.charAt(0).toUpperCase()+ role?.slice(1).toLowerCase()}</h2>
          <p className="text-sm text-gray-500">{user?.user?.email}</p>
        </div>
        <div className="mt-6 space-y-3 text-sm md:text-base">
          <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg">
            <span className="font-medium text-gray-600">Role</span>
            <span className="text-indigo-600 font-semibold">{role?.toUpperCase()}</span>
          </div>
          <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg">
            <span className="font-medium text-gray-600">Status</span>
            <span className="text-green-600 font-semibold">Logged In</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button disabled className="cursor-not-allowed w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition">Edit Profile</button>
          <button disabled  className="cursor-not-allowed w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg transition">Change Password</button>
        </div>
        
      </div>
    </div>
  )
}

export default Profile