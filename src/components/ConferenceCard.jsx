

import { Link } from 'react-router-dom';

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
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 m-2"
      >
        Delete
      </button>
      <Link to={`/schedule/${conference.id}`}>
        <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 m-2">
          Schedule
        </button>
      </Link>
      <button onClick={() => onEditClick(conference.id)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
  Edit
</button>
    </div>
  );
};

export default ConferenceCard;