/* eslint-disable no-unused-vars */

import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ScheduleFormModal from './ScheduleFormModal';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const Schedule = () => {
  const params = useParams();
  const id = params.id;
  const [conference, setConference] = useState(null);
  const [scheduleData, setScheduleData] = useState({ talk: '', time: '', duration: '1hrs', name: '', day: '', bio: '' });
  const [retrievedSchedule, setRetrievedSchedule] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedScheduleData, setEditedScheduleData] = useState({});
  const [error, setError] = useState(null);
  const [refId, setRefId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conferenceResponse = await axios.get(`http://localhost:8080/conferences/${id}`);
        setConference(conferenceResponse.data);

        const scheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
        setRetrievedSchedule(scheduleResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching conference data');
      }
    };

    fetchData();
  }, [id]);

  const groupByDay = (schedule) => {
    const groupedSchedule = {};
    schedule.forEach((item) => {
      if (!groupedSchedule[item.day]) {
        groupedSchedule[item.day] = [];
      }
      groupedSchedule[item.day].push(item);
    });
    return groupedSchedule;
  };

  const postSchedule = async () => {
    try {
      if (editing) {
        await axios.put(`http://localhost:8080/conferences/${id}/${refId}`, editedScheduleData);
        setEditing(false);
      } else {
        await axios.post(`http://localhost:8080/conferences/schedule/${id}`, scheduleData);
      }

      const updatedScheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
      setRetrievedSchedule(updatedScheduleResponse.data);

      setScheduleData({ talk: '', time: '', duration: '1hrs', name: '', day: '', bio: '' });
      setEditedScheduleData({});
      closeModal();
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


  const toggleEditing = () => {
    setEditing(!editing);
  };

  const editSchedule = (scheduleItem) => {
    setRefId(scheduleItem.id);
    setEditedScheduleData(scheduleItem);
    setEditing(true);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-end mx-[20px] my-[30px]">
      <button
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 "
              type="button"
              onClick={openModal}
            >
              <AddTwoToneIcon />
            </button>
            </div>
    <div className="container mx-auto p-4 text-center">
      {conference ? (
        <div className="flex flex-wrap">
          {retrievedSchedule && (
            <div className="w-full mb-8">
              <h3 className="text-xl font-bold mb-2">Schedules</h3>
              <div className="flex flex-row justify-around">
            <p className="font-bold text-xl mt-[20px] " > {conference.startDate}</p>
            <p className="font-bold text-xl mt-[20px] " >{conference.endDate}</p>
            </div>

              {Object.entries(groupByDay(retrievedSchedule)).map(([day, daySchedule]) => (
                <div key={day} className="mb-5">
                  <div className='border border-solid bg-green-100 p-[5px] rounded-[10px] mt-[10px] flex flex-row justify-around' >
                  <p className="font-bold  ">{conference.startTime}</p>
                  <h4 className="font-bold ">{`Day ${day}`}</h4>
                  <p className="font-bold  ">{conference.endTime}</p>
                  </div>
                  <div className="flex flex-wrap">
                    {daySchedule.map((scheduleItem, index) => (
                      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-4">
                        <p className="font-bold text-sm"> {scheduleItem.duration}</p>
                        <div className="bg-white border border-black-300 rounded p-4 h-full">
                          <p><span className="font-bold">Speaker Name:</span> {scheduleItem.name}</p>
                          <p><span className="font-bold">Designation:</span> {scheduleItem.bio}</p>
                          <p><span className="font-bold">Topic:</span> {scheduleItem.talk}</p>
                          <p><span className="font-bold">Time:</span> {scheduleItem.time}</p>
                          <button
                            className="bg-green-500 text-white rounded px-4 py-2 mt-2 hover:bg-green-600"
                            onClick={() => editSchedule(scheduleItem)}
                          >
                            <EditNoteIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='m-auto'>
            <div className="flex flex-col">
            </div>

            {isModalOpen && (
              <ScheduleFormModal
                closeModal={closeModal}
                postSchedule={postSchedule}
                handleInputChange={handleInputChange}
                scheduleData={scheduleData}
                editedScheduleData={editedScheduleData}
                editing={editing}
              />
            )}

            {retrievedSchedule && (
              <div className="flex flex-col items-center">
                <h1 className='text-3xl font-bold mt-5 underline m-5 text-white'>Conference Details</h1>
                <div className="p-4 bg-blue-100 w-[500px] shadow-md rounded-lg">
                  <h3 className="text-2xl underline font-semibold text-center mb-[20px]">{conference.name}</h3>
                  <p><span className="font-bold">Description:</span> {conference.description}</p>
                  <p><span className="font-bold  mt-[20px]">Start Date:</span> {conference.startDate}</p>
                  <p><span className="font-bold  mt-[20px]">Start Time:</span> {conference.startTime}</p>
                  <p><span className="font-bold  mt-[20px]">End Date:</span> {conference.endDate}</p>
                  <p><span className="font-bold  mt-[20px]">End Time:</span> {conference.endTime}</p>
                  <p><span className="font-bold  mb-[20px]">Location:</span> {conference.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>{error ? error : 'Loading conference details...'}</p>
      )}
    </div>
    </div>
  );
};

export default Schedule;


