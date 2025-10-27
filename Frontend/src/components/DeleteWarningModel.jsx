// components/DeleteWarningModal.jsx
import React from 'react';

const DeleteWarningModal = ({ listingTitle, onConfirmDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs ">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
        <h2 className="text-xl font-bold text-red-700 mb-4">Confirm Deletion</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the listing: <br/>
          <strong className="text-gray-900">"{listingTitle}"</strong>?
        </p>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningModal;
