

import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';

const ConferenceCard = ({ conference, deleteConference , onEditClick}) => {
  return (
    <div className="bg-white border border-gray-300 shadow-md rounded p-4 m-4">
      <h3 className="text-lg font-semibold mb-2" style={{display:"flex", justifyContent:"center"}}>{conference.name}</h3>
      <p className="text-gray-700 mb-2">{conference.description}</p>
      <p className="text-gray-700 mb-2">Start Date: {conference.startDate}</p>
      <p className="text-gray-700 mb-2">start Time: {conference.startTime}</p>
      <p className="text-gray-700 mb-2">End Date: {conference.endDate}</p>
      <p className="text-gray-700 mb-2">End Time: {conference.endTime}</p>
      <p className="text-gray-700 mb-2">Location: {conference.location}</p>
      <button
        onClick={() => deleteConference(conference.id)}
        className=" text-black p-2 rounded hover:bg-red-600 m-2"
      >
       <DeleteIcon />
      </button>
      <Link to={`/schedule/${conference.id}`}>
        <button className=" text-black p-2 rounded hover:bg-red-600 m-2">
          <CalendarMonthIcon />
        </button>
      </Link>
      <button onClick={() => onEditClick(conference.id)} className=" text-black p-2 rounded hover:bg-red-600 m-2">
  <EditIcon />
</button>
    </div>
  );
};

export default ConferenceCard;