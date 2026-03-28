import React from 'react';

const Modal = ({ show, onClose, title, message, isError = false }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-[340px] sm:max-w-md overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in slide-in-from-bottom-4 border border-slate-100">
        
        <div className="p-6 sm:p-10">
          
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-3xl ${isError ? 'bg-rose-50' : 'bg-emerald-50'}`}>
              {isError ? (
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isError ? 'text-rose-600' : 'text-slate-800'}`}>
              {title}
            </h3>
            <p className="text-slate-500 leading-relaxed text-xs sm:text-sm font-medium px-2 sm:px-4">
              {message}
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={onClose}
              className={`cursor-pointer w-full py-3.5 sm:py-4 px-6 text-sm sm:text-base font-bold text-white rounded-2xl shadow-xl transition-all duration-200 active:scale-[0.97] outline-none focus:ring-4 ${
                isError 
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200 focus:ring-rose-100' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 focus:ring-indigo-100'
              }`}
            >
              {isError ? 'Try Again' : 'Awesome'}
            </button>
          </div>
          
          <p className="hidden sm:block text-center text-[10px] text-slate-300 mt-4 uppercase tracking-widest font-bold">
            Press anywhere to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;