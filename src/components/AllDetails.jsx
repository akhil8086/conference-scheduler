import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AllDetails() {
    const params = useParams();
    const id = params.id;
  const [conference, setConference] = useState({});
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/conferences/${id}`)
      .then(response => {
        setConference(response.data);
      })
      .catch(error => {
        console.error('Error fetching conference details', error);
      });

   
    axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`)
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedules', error);
      });
  }, []);

  return (
    <div>
    
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Conference Details</h2>
        <div className="bg-gray-200 p-4 mb-4 rounded">
          <p>Title: {conference.title}</p>
          <p>Date: {conference.date}</p>
       
        </div>
      </div>

 
      <div>
        <h2 className="text-2xl font-bold mb-4">All Schedules</h2>
        {schedules.map(schedule => (
          <div key={schedule.id} className="bg-blue-200 p-4 mb-4 rounded">
            <p>Session: {schedule.session}</p>
            <p>Time: {schedule.time}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllDetails;
