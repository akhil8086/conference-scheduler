import React from 'react';
import { Link } from 'react-router-dom'; 

function ConferenceList({ conferenceData, deleteConference }) {
  console.log(conferenceData)
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {conferenceData.map((conference) => (
          <div key={conference.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <h2 className="text-lg font-bold mb-2">{conference.name}</h2>
            <p className="text-sm mb-2">{conference.description}</p>
            <p className="text-sm mb-2">Date: {conference.date}</p>
            <p className="text-sm mb-2">Location: {conference.location}</p>
            <p className="text-sm mb-2">Code of Conduct: {conference.codeOfConduct}</p>

            <div className="flex justify-center space-x-4 mt-4">
              <Link to={`/schedule/${conference.id}`}>
                <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                  Schedule
                </button>
              </Link>
              <button
                onClick={() => deleteConference(conference.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
                Delete Conference
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceList;

