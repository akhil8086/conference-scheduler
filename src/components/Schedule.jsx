

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Schedule = () => {
  const params = useParams();
  const id = params.id;
  const [conference, setConference] = useState(null);
  const [scheduleData, setScheduleData] = useState({ talk: '', time: '', name: '', bio: '' });
  const [retrievedSchedule, setRetrievedSchedule] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedScheduleData, setEditedScheduleData] = useState({});
  const [error, setError] = useState(null);
  const [refId, setRefId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conferenceResponse = await axios.get(`http://localhost:8080/conferences/${id}`);
        setConference(conferenceResponse.data);
        console.log(conferenceResponse.data);

        const scheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
        setRetrievedSchedule(scheduleResponse.data);
        console.log(scheduleResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching conference data');
      }
    };

    fetchData();
  }, [id]);

  const postSchedule = async () => {
    try {
      if (editing) {
        await axios.put(`http://localhost:8080/conferences/${id}/${refId}`, editedScheduleData);
        console.log(editedScheduleData);
        setEditing(false);
      } else {
        const response = await axios.post(`http://localhost:8080/conferences/schedule/${id}`, scheduleData);
        console.log('Schedule posted successfully:', response.data);
      }

      const updatedScheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
      setRetrievedSchedule(updatedScheduleResponse.data);
      console.log(updatedScheduleResponse.data);

      setScheduleData({ talk: '', time: '', name: '', bio: '' });
      setEditedScheduleData({});
    } catch (error) {
      console.error('Error posting schedule:', error);
      setError('Error posting schedule');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editing) {
      setEditedScheduleData({
        ...editedScheduleData,
        [name]: value,
      });
    } else {
      setScheduleData({
        ...scheduleData,
        [name]: value,
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const editSchedule = (scheduleItem) => {
    setRefId(scheduleItem.id);
    setEditedScheduleData(scheduleItem);
    setEditing(true);
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

              <div>
              {retrievedSchedule && (
        <div>
          <h1 className="text-lg font-bold my-2">Speakers</h1>
          {retrievedSchedule.map((scheduleItem, index) => (
            <div
              key={index}
            >
              <div className="bg-white p-4 rounded-md">
                <p className="text-lg font-bold">{scheduleItem.name}</p>
                <p className="text-lg font-bold">{scheduleItem.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
           
          </div>

          <div>
            <h1 className="text-3xl font-bold mt-5 underline">Conference Topics and Speakers</h1>
          </div>

          <form className="mb-4 mx-auto max-w-sm mt-8">
            <div className="bg-white p-4 rounded-md">
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
                Profession:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="bio"
                  name="bio"
                  value={editing ? editedScheduleData.bio : scheduleData.bio}
                  onChange={handleInputChange}
                />
              </label>

              {editing ? (
                <button
                  className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
                  type="button"
                  onClick={postSchedule}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                  type="button"
                  onClick={postSchedule}
                >
                  Add
                </button>
              )}
            </div>
          </form>

          {retrievedSchedule && (
            <div>
              <h3 className="text-xl font-bold mb-2">Schedules</h3>
              <div className="flex flex-wrap -mx-4">
                {retrievedSchedule.map((scheduleItem, index) => (
                  <div
                    key={index}
                    className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-4"
                  >
                    <div className="bg-white border border-black-300 rounded p-4">
                      <p><span className="font-bold">Topic:</span> {scheduleItem.talk}</p>
                      <p><span className="font-bold">Time:</span> {scheduleItem.time}</p>
                      <p><span className="font-bold">Speaker Name:</span> {scheduleItem.name}</p>
                      <p><span className="font-bold">Profession:</span> {scheduleItem.bio}</p>
                      <button
                        className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 mt-2"
                        onClick={() => editSchedule(scheduleItem)}
                      >
                        <EditNoteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {retrievedSchedule && (
            <div className="flex flex-col items-center">
              <h1 className='text-3xl font-bold mt-5 underline m-5'>Conference Details</h1>
              <div className="p-4 bg-gray-100 w-[500px] shadow-md">
                <h3 className="text-2xl underline font-semibold text-center">{conference.name}</h3>
                <p><span className="font-bold">Description:</span> {conference.description}</p>
                <p><span className="font-bold">Start Date:</span> {conference.startDate}</p>
                <p><span className="font-bold">Start Time:</span> {conference.startTime}</p>
                <p><span className="font-bold">End Date:</span> {conference.endDate}</p>
                <p><span className="font-bold">End Time:</span> {conference.endTime}</p>
                <p><span className="font-bold">Location:</span> {conference.location}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>{error ? error : 'Loading conference details...'}</p>
      )}
    </div>
  );
};

export default Schedule;
