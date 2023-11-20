

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Schedule = () => {
  const params = useParams();
  const id = params.id;
  const [conference, setConference] = useState(null);
  const [scheduleData, setScheduleData] = useState({ talk: '', time: '', name: '', bio: '' });
  const [retrievedSchedule, setRetrievedSchedule] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editScheduleId, setEditScheduleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conferenceResponse = await axios.get(`http://localhost:8080/conferences/${id}`);
        setConference(conferenceResponse.data);

        const scheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
        setRetrievedSchedule(scheduleResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const postSchedule = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/conferences/schedule/${id}`, scheduleData);
      console.log('Schedule posted successfully:', response.data);

      const updatedScheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
      setRetrievedSchedule(updatedScheduleResponse.data);

      setScheduleData({ talk: '', time: '', name: '', bio: '' });
    } catch (error) {
      console.error('Error posting schedule:', error);
    }
  };

  const handleEditClick = (scheduleId) => {
    const scheduleToEdit = retrievedSchedule.find((item) => item.id === scheduleId);
    setEditMode(true);
    setEditScheduleId(scheduleId);
    setScheduleData({
      talk: scheduleToEdit.talk,
      time: scheduleToEdit.time,
      name: scheduleToEdit.name,
      bio: scheduleToEdit.bio,
    });
  };

  const handleEditSchedule = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/conferences/schedule/${id}/${editScheduleId}`,
        scheduleData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Schedule edited successfully:', response.data);

      setRetrievedSchedule((prevSchedule) => {
        const updatedSchedule = prevSchedule.map((item) => {
          if (item.id === editScheduleId) {
            return { ...item, ...scheduleData };
          }
          return item;
        });
        return updatedSchedule;
      });

      setEditMode(false);
      setEditScheduleId(null);
      setScheduleData({ talk: '', time: '', name: '', bio: '' });
    } catch (error) {
      console.error('Error editing schedule:', error.message);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4 text-center">
      {conference ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h1 className="text-3xl font-bold mt-5 underline">Event Details</h1>
            <h2 className="text-2xl font-bold mt-6 ">{conference.name}</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-md">
                <h2 className="text-lg font-bold"> {conference.startDate}</h2>
                <h2 className="text-lg font-bold">{conference.startTime}</h2>
              </div>
              <div className="bg-white p-4 rounded-md">
                <h2 className="text-lg font-bold"> {conference.endDate}</h2>
                <h2 className="text-lg font-bold"> {conference.endTime}</h2>
              </div>
            </div>
          </div>

          <form className="mb-4 mx-auto max-w-sm mt-8">
            <div className="bg-white p-4 rounded-md">
              <label className="block mb-2 text-xl">
                Topic:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="text"
                  name="talk"
                  value={scheduleData.talk}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2 text-xl">
                Time:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="time"
                  name="time"
                  value={scheduleData.time}
                  onChange={handleInputChange}
                />
              </label>

              <label className="block mb-2 text-xl">
                Speaker Name:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="name"
                  name="name"
                  value={scheduleData.name}
                  onChange={handleInputChange}
                />
              </label>

              <label className="block mb-2 text-xl">
                Bio:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="bio"
                  name="bio"
                  value={scheduleData.bio}
                  onChange={handleInputChange}
                />
              </label>

              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                type="button"
                onClick={editMode ? handleEditSchedule : postSchedule}
              >
                {editMode ? 'Edit' : 'Add'}
              </button>
            </div>
          </form>

          {retrievedSchedule && (
            <div>
              <h3 className="text-xl font-bold mb-2">Schedules:</h3>
              <div className='flex flex-row flex-wrap'>
                {retrievedSchedule.map((scheduleItem, index) => (
                  <div
                    key={index}
                    className="bg-white border border-black-300 rounded p-4 mb-4 mx-auto max-w-sm"
                  >
                    <p><span className="font-bold">Topic:</span> {scheduleItem.talk}</p>
                    <p><span className="font-bold">Time:</span> {scheduleItem.time}</p>
                    <p><span className="font-bold">Speaker Name:</span> {scheduleItem.name}</p>
                    <p><span className="font-bold">Bio:</span> {scheduleItem.bio}</p>
                    <button onClick={() => handleEditClick(scheduleItem.id)}>Edit</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading conference details...</p>
      )}
      <div>
        {/* <Link to={`/alldetails/${conference.id}`}>
        <button>
          Conference details
        </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Schedule;
