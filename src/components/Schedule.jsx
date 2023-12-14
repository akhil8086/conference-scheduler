

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomeIcon from '@mui/icons-material/Home';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  fetchConference,
  fetchSchedule,
  postSchedule,
  deleteSchedule,
} from './redux/scheduleSlice';
import ScheduleFormModal from './ScheduleFormModal';

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
      const { startTime, endTime } = conference;
      const conferenceStartDate = new Date(conference.startDate);
      const conferenceStartTime = new Date(`${conference.startDate} ${startTime}`);
      const conferenceEndTime = new Date(`${conference.startDate} ${endTime}`);
  
      const scheduleStartTime = new Date(`${conference.startDate} ${scheduleData.time}`);
      const scheduleEndTime = new Date(scheduleStartTime);
      scheduleEndTime.setHours(scheduleEndTime.getHours() + parseInt(scheduleData.duration));
  
      if (
        scheduleStartTime < conferenceStartTime ||
        scheduleEndTime > conferenceEndTime
      ) {
        alert('Schedule time must be within the conference start and end times.');
      } else {
        const isOverlap = retrievedSchedule.some((item) => {
          const itemStartTime = new Date(`${item.day} ${item.time}`);
          const itemEndTime = new Date(itemStartTime);
          itemEndTime.setHours(itemEndTime.getHours() + parseInt(item.duration));
  
          return (
            (scheduleStartTime >= itemStartTime && scheduleStartTime < itemEndTime) ||
            (scheduleEndTime > itemStartTime && scheduleEndTime <= itemEndTime) ||
            (scheduleStartTime <= itemStartTime && scheduleEndTime >= itemEndTime)
          );
        });
  
        if (isOverlap) {
          alert('Schedule overlaps with existing schedule. Please choose a different time.');
        } else {
          let updatedScheduleResponse;
  
          if (editing) {
            await dispatch(
              postSchedule({
                id,
                data: editedScheduleData,
                editing,
                refId,
              })
            );
  
            updatedScheduleResponse = await dispatch(fetchSchedule(id));
          } else {
            await dispatch(postSchedule({ id, data: scheduleData, editing, refId }));
  
            updatedScheduleResponse = await dispatch(fetchSchedule(id));
          }
  
          setRetrievedSchedule(updatedScheduleResponse.payload);
          resetScheduleData();
          closeModal();
          setEditing(false);
        }
      }
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

  const formatTime = (timeString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString(undefined, options);
  };

const generateRows = () => {
    const rows = [];
    const startDate = new Date(conference.startDate);
    const endDate = new Date(conference.endDate);
    const numberOfDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
    for (let day = 1; day <= numberOfDays; day++) {
      let daySchedule = retrievedSchedule
        ? retrievedSchedule.filter(item => item.day == day)
        : [];
  
  
      daySchedule = daySchedule.sort((a, b) => {
        const timeA = new Date(`${a.day} ${a.time}`);
        const timeB = new Date(`${b.day} ${b.time}`);
        return timeA - timeB;
      });
  
      rows.push({
        day: day,
        schedule: daySchedule,
      });
    }
  
    return rows;
  };

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
      <div className="flex flex-row mx-[50px] my-[30px] justify-between">
        <Link to='/'>
          <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
            <HomeIcon />
          </button>
        </Link>
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
                      <p className="font-bold">{formatTime(conference.startTime)}</p>
                      <h4 className="font-bold">{`Day ${row.day}`}</h4>
                      <p className="font-bold">{formatTime(conference.endTime)}</p>
                    </div>
                    <div className="flex flex-wrap">
                      {row.schedule.map((scheduleItem, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-4 ">
                          <div className="bg-white border border-black-300 rounded p-4 h-full">
                            <p><span className="font-bold">Speaker Name:</span> {scheduleItem.name}</p>
                            <p><span className="font-bold">Designation:</span> {scheduleItem.bio}</p>
                            <p><span className="font-bold">Topic:</span> {scheduleItem.talk}</p>
                            <p><span className="font-bold">Time:</span> {formatTime(scheduleItem.time)}</p>
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
                    <p><span className="font-bold  mt-[20px]">Start Time:</span> {formatTime(conference.startTime)}</p>
                    <p><span className="font-bold  mt-[20px]">End Date:</span> {conference.endDate}</p>
                    <p><span className="font-bold  mt-[20px]">End Time:</span> {formatTime(conference.endTime)}</p>
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
