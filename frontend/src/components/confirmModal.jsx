import React from 'react'

const ConfirmModal = ({ show, onClose, title, message, onConfirm, confirmText = "Yes", cancelText = "Cancel" }) => {
    if (!show) return null;

  return (
    <div className="fixed inset-0 top-0 flex items-center justify-center z-50 p-4 md:p-0">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm md:max-w-md lg:max-w-lg relative">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800">{title}</h3>
            <p className="text-sm md:text-base text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end gap-3 flex-wrap">
                 {onConfirm && (
            <button
              onClick={() => { onConfirm(); onClose(); }}
              className="cursor-pointer px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
          >
            {cancelText}
          </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal