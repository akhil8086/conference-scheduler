

import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';

const ConferenceCard = ({ conference, deleteConference , onEditClick}) => {
  return (
    <div className="bg-white border border-gray-300 shadow-md rounded p-4 m-4">
      <h3 className="text-lg font-semibold mb-2 flex justify-center">{conference.name}</h3>
      <p> <span className="font-bold"></span>{conference.description}</p>
      <p> <span className="font-bold">Start Date:</span> {conference.startDate}</p>
      <p> <span className="font-bold">start Time:</span> {conference.startTime}</p>
      <p> <span className="font-bold">End Date:</span> {conference.endDate}</p>
      <p> <span className="font-bold">End Time:</span> {conference.endTime}</p>
      <p> <span className="font-bold">Location:</span> {conference.location}</p>
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