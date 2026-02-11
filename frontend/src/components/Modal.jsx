import React from 'react'

const Modal = ({show,onClose,title,message}) => {
    if(!show) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 md:p-0'>
        <div className='bg-white rounded-xl shadow-lg p-6 w-full max-w-sm md:max-w-md lg:max-w-lg relative'>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">{title}</h3>
            <p className="text-sm md:text-base text-gray-700 mb-6">{message}</p>
            <button onClick={onClose}
             className="cursor-pointer w-full md:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">Ok</button>
        </div>
    </div>
  )
}

export default Modal