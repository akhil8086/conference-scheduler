

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';

function ConferenceDetails() {
  const [conferenceData, setConferenceData] = useState(null);
  const param = useParams();
  const id = param.id;

  const fetchConferenceData = () => {
    axios
      .get(`http://localhost:8080/conferences/${id}`)
      .then((response) => {
        setConferenceData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching conference data:', error);
      });
  };

  useEffect(() => {
    fetchConferenceData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mt-8 text-center">Conference Details</h2>
      <button onClick={fetchConferenceData} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mx-2">
        Deatils
      </button>
      {conferenceData && (
        <div className="bg-white p-4 rounded shadow-md mt-4 mx-auto w-1/2 text-center">
          <h3 className="text-xl font-semibold">Name: {conferenceData.name}</h3>
          <p className="mt-2">Description: {conferenceData.description}</p>
          <p>Date: {conferenceData.date}</p>
          <p>Location: {conferenceData.location}</p>
          <p>Code of Conduct: {conferenceData.codeOfConduct}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default ConferenceDetails;
