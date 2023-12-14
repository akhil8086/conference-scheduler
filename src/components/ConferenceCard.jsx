

import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const timeConverter = (time) => {
  if (!time) return ''; 

  const [hour, minute] = time.split(':');
  const parsedHour = parseInt(hour, 10);
  
  if (isNaN(parsedHour)) {
    return ''; 
  }

  const period = parsedHour >= 12 ? 'PM' : 'AM';
  const formattedHour = (parsedHour % 12) || 12;
  return `${formattedHour}:${minute || '00'} ${period}`;
};

const ConferenceCard = ({ conference, deleteConference, onEditClick }) => {
  return (
    <div className="bg-purple-100 border border-gray-300 shadow-md rounded m-4 w-[600px] py-6">
      <h3 className="text-xl font-semibold mb-3 flex justify-center text-[30px] text-red-700 underline">{conference.name}</h3>
      <p className="font-bold px-[50px] text-[18px] mt-[20px] mb-[20px] flex flex-row justify-center">{conference.description}</p>
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[20px] mb-[10px] text-[#007FFF]"> From </p>
        <div className="flex flex-row gap-[50px]">
          <p className="font-bold text-[20px] ">
            <EventIcon /> {conference.startDate}
          </p>
          <p className="font-bold text-[20px] mb-[20px]">
            <AccessTimeFilledIcon /> {timeConverter(conference.startTime)}
          </p>
        </div>
        <p className="font-semibold text-[20px] mb-[10px] text-[#007FFF]"> To </p>
        <div className="flex flex-row gap-[50px]">
          <p className="font-bold text-[20px]">
            <EventIcon /> {conference.endDate}
          </p>
          <p className="font-bold text-[20px] mb-[20px]">
            <AccessTimeFilledIcon /> {timeConverter(conference.endTime)}
          </p>
        </div>
        <p className="font-bold text-[20px]">
          <LocationOnIcon /> {conference.location}
        </p>
      </div>
      <div className="flex flex-row justify-around p-[20px]">
        <button
          onClick={() => deleteConference(conference.conferenceId)}
          className=" text-black p-2 rounded hover:bg-red-600 m-2"
        >
          <DeleteIcon />
        </button>
        <Link to={`/schedule/${conference.conferenceId}`}>
          <button className=" text-black p-2 rounded hover:bg-red-600 m-2">
            <CalendarMonthIcon />
          </button>
        </Link>
        <button onClick={() => onEditClick(conference.conferenceId)} className=" text-black p-2 rounded hover:bg-red-600 m-2">
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

export default ConferenceCard;
