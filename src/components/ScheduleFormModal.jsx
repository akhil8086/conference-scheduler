/* eslint-disable react/prop-types */


const ScheduleFormModal = ({
  closeModal,
  postSchedule,
  handleInputChange,
  scheduleData,
  editedScheduleData,
  editing,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h1 className="text-3xl font-bold mb-5">{editing ? 'Edit Schedule' : 'Add Schedule'}</h1>
        <form className="mb-4">
          <label className="block mb-2 text-xl">
            Topic:
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="text"
              name="talk"
              value={editing ? editedScheduleData.talk : scheduleData.talk}
              onChange={handleInputChange}
            />
          </label>
          <label className="block mb-2 text-xl">
            Time:
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="time"
              name="time"
              value={editing ? editedScheduleData.time : scheduleData.time}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-2 text-xl">
            Duration:
            <select
              className="border border-gray-300 rounded px-3 py-2 w-full"
              name="duration"
              value={editing ? editedScheduleData.duration : scheduleData.duration}
              onChange={handleInputChange}
            >
              <option value="1hrs">1 hrs</option>
              <option value="2hrs">2 hrs</option>
            </select>
          </label>

          <label className="block mb-2 text-xl">
            Speaker Name:
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="name"
              name="name"
              value={editing ? editedScheduleData.name : scheduleData.name}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-2 text-xl">
            Day:
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="day"
              name="day"
              value={editing ? editedScheduleData.day : scheduleData.day}
              onChange={handleInputChange}
            />
          </label>

          <label className="block mb-2 text-xl">
            Designation:
            <input
              className="border border-gray-300 rounded px-3 py-2 w-full"
              type="bio"
              name="bio"
              value={editing ? editedScheduleData.bio : scheduleData.bio}
              onChange={handleInputChange}
            />
          </label>

          <button
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 mr-2"
            type="button"
            onClick={() => {
              postSchedule();
              closeModal();
            }}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleFormModal;
