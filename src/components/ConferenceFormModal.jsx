
/* eslint-disable react/prop-types */

import  { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ConferenceFormModal = ({ showModal, onClose, onSubmit, formData, onChange }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

  
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    
    if (!formData.startDate) {
      newErrors.startDate = 'Start Date is required';
    }

   
    if (!formData.startTime) {
      newErrors.startTime = 'Start Time is required';
    }


    if (!formData.endDate) {
      newErrors.endDate = 'End Date is required';
    }

  
    if (!formData.endTime) {
      newErrors.endTime = 'End Time is required';
    }

  
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={`${showModal ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto my-auto h-[650px]`}>
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <div className="flex flex-row justify-end mb-4">
              <button onClick={onClose} type="button">
                <CloseIcon />
              </button>
            </div>
            <h2 className="text-2xl font-bold mt-8 text-center">New Conference</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.description ? 'border-red-500' : ''
                  }`}
                />
                {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>}
              </div>
              <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Start Date:</label>
              <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={onChange}
              min={getCurrentDate()} 
             className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
             errors.startDate ? 'border-red-500' : ''
             }`}
             />
             {errors.startDate && <p className="text-red-500 mt-1">{errors.startDate}</p>}
             </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.startTime ? 'border-red-500' : ''
                  }`}
                />
                {errors.startTime && <p className="text-red-500 mt-1">{errors.startTime}</p>}
                 </div>
      
                  <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">End Date:</label>
                  <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={onChange}
                  min={formData.startDate} 
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                 errors.endDate ? 'border-red-500' : ''
          }`}
        />
        {errors.endDate && <p className="text-red-500 mt-1">{errors.endDate}</p>}
      </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.endTime ? 'border-red-500' : ''
                  }`}
                />
                {errors.endTime && <p className="text-red-500 mt-1">{errors.endTime}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.location ? 'border-red-500' : ''
                  }`}
                />
                {errors.location && <p className="text-red-500 mt-1">{errors.location}</p>}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mx-2"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceFormModal;










