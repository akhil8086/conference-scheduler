
/* eslint-disable react/prop-types */

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ScheduleFormModal = ({
  closeModal,
  postSchedule,
  handleInputChange,
  scheduleData,
  editedScheduleData,
  editing,
  dayOptions,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    if (!editing) {
      const newErrors = {};

      if (!scheduleData.talk || scheduleData.talk.trim() === '') {
        newErrors.talk = 'Topic is required';
      }

      if (!scheduleData.time || scheduleData.time.trim() === '') {
        newErrors.time = 'Time is required';
      }

      if (!scheduleData.duration || scheduleData.duration.trim() === '') {
        newErrors.duration = 'Duration is required';
      }

      if (!scheduleData.name || scheduleData.name.trim() === '') {
        newErrors.name = 'Speaker Name is required';
      }

      if (!scheduleData.day || scheduleData.day.trim() === '') {
        newErrors.day = 'Day is required';
      }

      if (!scheduleData.bio || scheduleData.bio.trim() === '') {
        newErrors.bio = 'Designation is required';
      }

      setErrors(newErrors);

     
      return Object.keys(newErrors).length === 0;
    }

  
    return true;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <div className="flex flex-row justify-end mb-4">
          <button onClick={closeModal} type="button">
            <CloseIcon />
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-5">
          {editing ? 'Edit Schedule' : 'Add Schedule'}
        </h1>
        <form className="mb-4">
          <label className="block mb-2 text-xl">
            Topic:
            <input
              className={`border border-gray-300 rounded px-3 py-2 w-full ${
                errors.talk ? 'border-red-500' : ''
              }`}
              type="text"
              name="talk"
              required
              value={editing ? editedScheduleData.talk : scheduleData.talk}
              onChange={handleInputChange}
            />
            {errors.talk && (
              <p className="text-red-500 mt-1">{errors.talk}</p>
            )}
          </label>

          <label className="block mb-2 text-xl">
            Time:
            <input
              className={`border border-gray-300 rounded px-3 py-2 w-full ${
                errors.time ? 'border-red-500' : ''
              }`}
              type="time"
              name="time"
              required
              value={editing ? editedScheduleData.time : scheduleData.time}
              onChange={handleInputChange}
            />
            {errors.time && (
              <p className="text-red-500 mt-1">{errors.time}</p>
            )}
          </label>

          <label className="block mb-2 text-xl">
            Duration:
            <select
              className={`border border-gray-300 rounded px-3 py-2 w-full ${
                errors.duration ? 'border-red-500' : ''
              }`}
              name="duration"
              value={editing ? editedScheduleData.duration : scheduleData.duration}
              required
              onChange={handleInputChange}
            >
              <option value="1hrs">1 hr</option>
              {/* <option value="2hrs">2 hrs</option> */}
            </select>
            {errors.duration && (
              <p className="text-red-500 mt-1">{errors.duration}</p>
            )}
          </label>

          <label className="block mb-2 text-xl">
            Speaker Name:
            <input
              className={`border border-gray-300 rounded px-3 py-2 w-full ${
                errors.name ? 'border-red-500' : ''
              }`}
              type="text"
              name="name"
              required
              value={editing ? editedScheduleData.name : scheduleData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name}</p>
            )}
          </label>

          <label className="block mb-2 text-xl">
            Day:
            <select
              className={`border border-gray-300 rounded px-3 py-2 w-full ${
                errors.day ? 'border-red-500' : ''
              }`}
              name="day"
              required
              value={editing ? editedScheduleData.day : scheduleData.day}
              onChange={handleInputChange}
            >
              {dayOptions.map((day, index) => (
                <option key={index} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
            {errors.day && (
              <p className="text-red-500 mt-1">{errors.day}</p>
            )}
          </label>

          <label className="block mb-2 text-xl">
            Designation:
            <input
              className={`border border-gray-300 rounded px-3 py-2 w-full ${
                errors.bio ? 'border-red-500' : ''
              }`}
              type="text"
              name="bio"
              required
              value={editing ? editedScheduleData.bio : scheduleData.bio}
              onChange={handleInputChange}
            />
            {errors.bio && (
              <p className="text-red-500 mt-1">{errors.bio}</p>
            )}
          </label>

          <button
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 mr-2"
            type="button"
            onClick={() => {
              if (validateForm()) {
                postSchedule();
                closeModal();
              }
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleFormModal;
