

const ConferenceFormModal = ({ showModal, onClose, onSubmit, formData, onChange }) => {
    return (
      <div className={`${showModal ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-2xl font-bold mt-8 text-center">New Conference</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={onChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={onChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mx-2"
                  >
                    SAVE
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mx-2"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ConferenceFormModal