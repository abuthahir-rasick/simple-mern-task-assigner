import React from 'react';

const Modal = ({ show, onClose, title, message, isError = false }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      
     
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md overflow-hidden transform transition-all border border-gray-100">
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold tracking-tight ${isError ? 'text-red-600' : 'text-gray-900'}`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="mt-2 mb-8">
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {message}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`cursor-pointer w-full sm:w-auto px-5 py-2.5 text-white text-sm font-medium rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 ${
                isError 
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-200 focus:ring-red-500' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 focus:ring-indigo-500'
              }`}
            >
              {isError ? 'Try Again' : 'Got it'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;