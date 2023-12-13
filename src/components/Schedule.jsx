

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConference,
  fetchSchedule,
  postSchedule,
  deleteSchedule,
} from './scheduleSlice';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ScheduleFormModal from './ScheduleFormModal';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Schedule = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const { conference, error } = useSelector((state) => state.schedule);
  const [scheduleData, setScheduleData] = useState({
    talk: '',
    time: '',
    duration: '1hrs',
    name: '',
    day: '1',
    bio: '',
  });
  const [retrievedSchedule, setRetrievedSchedule] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedScheduleData, setEditedScheduleData] = useState({});
  const [refId, setRefId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayOptions, setDayOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchConference(id));
      const scheduleResponse = await dispatch(fetchSchedule(id));
      setRetrievedSchedule(scheduleResponse.payload);
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (conference) {
      const startDate = new Date(conference.startDate);
      const endDate = new Date(conference.endDate);
      const numberOfDays =
        Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      const dayOptions = Array.from(
        { length: numberOfDays },
        (_, index) => String(index + 1)
      );
      setDayOptions(dayOptions);
    }
  }, [conference]);

  const resetScheduleData = () => {
    setScheduleData({
      talk: '',
      time: '',
      duration: '1hrs',
      name: '',
      day: '1',
      bio: '',
    });
    setEditedScheduleData({});
  };

  const postScheduleItem = async () => {
    try {
      if (editing) {
        await dispatch(
          postSchedule({
            id,
            data: editedScheduleData,
            editing,
            refId,
          })
        );
      } else {
        await dispatch(postSchedule({ id, data: scheduleData, editing, refId }));
      }

      
      const updatedScheduleResponse = await dispatch(fetchSchedule(id));
      setRetrievedSchedule(updatedScheduleResponse.payload);

      resetScheduleData();
      closeModal();
      setEditing(false);
    } catch (error) {
      console.error('Error posting schedule:', error.message);
   
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

  const deleteScheduleItem = async (scheduleId) => {
    try {
      await dispatch(deleteSchedule({ conferenceId: id, scheduleId }));

   
      const updatedScheduleResponse = await dispatch(fetchSchedule(id));
      setRetrievedSchedule(updatedScheduleResponse.payload);
    } catch (error) {
      console.error('Error deleting schedule:', error.message);
    }
  };

  function generateRows() {
    const rows = [];
    const startDate = new Date(conference.startDate);
    const endDate = new Date(conference.endDate);
    const numberOfDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    for (let day = 1; day <= numberOfDays; day++) {
      const daySchedule = retrievedSchedule ? retrievedSchedule.filter(item => item.day == day) : [];
      rows.push({
        day: day,
        schedule: daySchedule,
      });
    }

    return rows;
  }

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const editSchedule = (scheduleItem) => {
    console.log(scheduleItem);
    setRefId(scheduleItem.scheduleId);
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
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
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
                {generateRows().map((row, index) => (
                  <div key={index} className="mb-5">
                    <div className='border border-solid bg-green-100 p-[5px] rounded-[10px] mt-[10px] flex flex-row justify-around'>
                      <p className="font-bold  ">{conference.startTime}</p>
                      <h4 className="font-bold">{`Day ${row.day}`}</h4>
                      <p className="font-bold  ">{conference.endTime}</p>
                    </div>
                    <div className="flex flex-wrap">
                      {row.schedule.map((scheduleItem, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-4 ">
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
                            <button
                              className="bg-red-500 text-white rounded px-4 py-2 mt-2 hover:bg-red-600"
                              onClick={() => deleteScheduleItem(scheduleItem.scheduleId)}
                            >
                              <DeleteOutlineIcon />
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
                  postSchedule={postScheduleItem}
                  handleInputChange={handleInputChange}
                  scheduleData={scheduleData}
                  editedScheduleData={editedScheduleData}
                  editing={editing}
                  dayOptions={dayOptions}
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
