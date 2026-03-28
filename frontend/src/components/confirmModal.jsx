import React from 'react';

const ConfirmModal = ({ 
    show, 
    onClose, 
    title, 
    message, 
    onConfirm, 
    confirmText = "Confirm", 
    cancelText = "Cancel" 
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                
                <div className="flex items-center justify-center pt-6 sm:pt-8">
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                <div className="p-6 sm:p-8 text-center">
                    <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 mb-2">
                        {title}
                    </h3>
                    
                    <p className="text-xs sm:text-base text-gray-500 leading-relaxed">
                        {message}
                    </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-32 px-4 py-2.5 text-xs sm:text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    
                    {onConfirm && (
                        <button
                            onClick={() => { onConfirm(); onClose(); }}
                            className="w-full sm:w-32 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 active:scale-95 transition-all duration-200 cursor-pointer"
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;