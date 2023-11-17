


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Schedule = () => {
  const params = useParams();
  const id = params.id;
  const [conference, setConference] = useState(null);
  const [scheduleData, setScheduleData] = useState({ talk: '', time: '',name: '', bio: '' });
  const [retrievedSchedule, setRetrievedSchedule] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const conferenceResponse = await axios.get(`http://localhost:8080/conferences/${id}`);
        setConference(conferenceResponse.data);

    
        const scheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
        setRetrievedSchedule(scheduleResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const postSchedule = async () => {
    try {
     
      const response = await axios.post(`http://localhost:8080/conferences/schedule/${id}`, scheduleData);
      console.log('Schedule posted successfully:', response.data);

     
      const updatedScheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
      setRetrievedSchedule(updatedScheduleResponse.data);

     
      setScheduleData({ talk: '', time: '', name: '', bio: '' });
    } catch (error) {
      console.error('Error posting schedule:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4 text-center">
      {conference ? (
        <div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h1 className="text-3xl font-bold mt-5 underline">Event Details</h1>
            <h2 className="text-2xl font-bold mt-6 ">{conference.name}</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-md">
                <h2 className="text-lg font-bold"> {conference.startDate}</h2>
                <h2 className="text-lg font-bold">{conference.startTime}</h2>
              </div>
              <div className="bg-white p-4 rounded-md">
                <h2 className="text-lg font-bold"> {conference.endDate}</h2>
                <h2 className="text-lg font-bold"> {conference.endTime}</h2>
              </div>
            </div>
          </div>

          <form className="mb-4 mx-auto max-w-sm mt-8">
            <div className="bg-white p-4 rounded-md">
              <label className="block mb-2 text-xl">
                Topic:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="text"
                  name="talk"
                  value={scheduleData.talk}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2 text-xl">
                Time:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="time"
                  name="time"
                  value={scheduleData.time}
                  onChange={handleInputChange}
                />
              </label>

              <label className="block mb-2 text-xl">
                Speaker Name:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="name"
                  name="name"
                  value={scheduleData.name}
                  onChange={handleInputChange}
                />
              </label>

              <label className="block mb-2 text-xl">
                Bio:
                <input
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  type="bio"
                  name="bio"
                  value={scheduleData.bio}
                  onChange={handleInputChange}
                />
              </label>

              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                type="button"
                onClick={postSchedule}
              >
                Add
              </button>
            </div>
          </form>

          {retrievedSchedule && (
            <div>
              <h3 className="text-xl font-bold mb-2">Schedules:</h3>
              <div className='flex flex-row flex-wrap'>
                {retrievedSchedule.map((scheduleItem, index) => (
                  <div
                    key={index}
                    className="bg-white border border-black-300 rounded p-4 mb-4 mx-auto max-w-sm"
                  >
                    <p><span className="font-bold">Topic:</span> {scheduleItem.talk}</p>
                    <p><span className="font-bold">Time:</span> {scheduleItem.time}</p>
                    <p><span className="font-bold">Speaker Name:</span> {scheduleItem.name}</p>
                    <p><span className="font-bold">Bio:</span> {scheduleItem.bio}</p>
                    {/* <button>Edit</button> */}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading conference details...</p>
      )}
    </div>
  );
};

export default Schedule;







// Schedule.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import SpeakerCard from './SpeakerCard';

// const Schedule = () => {
//   const params = useParams();
//   const id = params.id;
//   const [conference, setConference] = useState(null);
//   const [scheduleData, setScheduleData] = useState({ talk: '', time: '', speakers: [] });
//   const [retrievedSchedule, setRetrievedSchedule] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [speakers, setSpeakers] = useState([]);
//   const [selectedScheduleId, setSelectedScheduleId] = useState(null);
//   const [speakerData, setSpeakerData] = useState({ name: '', bio: '' });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const conferenceResponse = await axios.get(`http://localhost:8080/conferences/${id}`);
//         setConference(conferenceResponse.data);

//         const scheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
//         setRetrievedSchedule(scheduleResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const postSchedule = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8080/conferences/schedule/${id}`, scheduleData);
//       console.log('Schedule posted successfully:', response.data);

//       const updatedScheduleResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${id}`);
//       setRetrievedSchedule(updatedScheduleResponse.data);

//       setScheduleData({ talk: '', time: '', speakers: [] });
//     } catch (error) {
//       console.error('Error posting schedule:', error);
//     }
//   };

//   const openModal = (scheduleId) => {
//     setIsModalOpen(true);
//     setSelectedScheduleId(scheduleId);

//     const selectedSchedule = retrievedSchedule.find(schedule => schedule.id === scheduleId);
//     if (selectedSchedule) {
//       setSpeakerData({ name: '', bio: '' });
//       setSpeakers(selectedSchedule.speakers || []);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSpeakerData({ name: '', bio: '' });
//   };

//   const addSpeaker = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8080/conferences/schedule/speaker/${id}/${selectedScheduleId}`, speakerData);
//       console.log('Speaker added successfully:', response.data);

//       const updatedSpeakersResponse = await axios.get(`http://localhost:8080/conferences/schedule/view-speaker/${id}/${selectedScheduleId}`);
//       console.log('Updated speakers response:', updatedSpeakersResponse.data);

//       if (Array.isArray(updatedSpeakersResponse.data)) {
//         setSpeakers(updatedSpeakersResponse.data);
//       } else if (typeof updatedSpeakersResponse.data === 'object') {
//         setSpeakers([updatedSpeakersResponse.data]);
//       } else {
//         console.error('Invalid speakers data:', updatedSpeakersResponse.data);
//       }

//       setSpeakerData({ name: '', bio: '' });
//       closeModal();
//     } catch (error) {
//       console.error('Error adding speaker:', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setScheduleData({
//       ...scheduleData,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="container mx-auto p-4 text-center">
//       {conference ? (
//         <div>
//           <div className="bg-gray-100 p-4 rounded-lg mb-4">
//             <h1 className="text-3xl font-bold mt-5 underline">Event Details</h1>
//             <h2 className="text-2xl font-bold mt-6 ">{conference.name}</h2>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div className="bg-white p-4 rounded-md">
//                 <h2 className="text-lg font-bold">From</h2>
//                 <h2 className="text-lg font-bold"> {conference.startDate}</h2>
//                 <h2 className="text-lg font-bold"> {conference.startTime}</h2>
//               </div>
//               <div className="bg-white p-4 rounded-md">
//                 <h2 className="text-lg font-bold">To</h2>
//                 <h2 className="text-lg font-bold"> {conference.endDate}</h2>
//                 <h2 className="text-lg font-bold"> {conference.endTime}</h2>
//               </div>
//             </div>
//           </div>

//           <form className="mb-4 mx-auto max-w-sm mt-8">
//             <div className="bg-white p-4 rounded-md">
//               <label className="block mb-2 text-xl">
//                 Topic:
//                 <input
//                   className="border border-gray-300 rounded px-3 py-2 w-full"
//                   type="text"
//                   name="talk"
//                   value={scheduleData.talk}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label className="block mb-2 text-xl">
//                 Time:
//                 <input
//                   className="border border-gray-300 rounded px-3 py-2 w-full"
//                   type="time"
//                   name="time"
//                   value={scheduleData.time}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <button
//                 className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
//                 type="button"
//                 onClick={postSchedule}
//               >
//                 Add
//               </button>
//             </div>
//           </form>

//           {retrievedSchedule && (
//             <div>
//               <h3 className="text-xl font-bold mb-2">Schedules:</h3>
//               <div className='flex flex-row flex-wrap'>
//                 {retrievedSchedule.map((scheduleItem, index) => (
//                   <div
//                     key={index}
//                     className="bg-white border border-black-300 rounded p-4 mb-4 mx-auto max-w-sm"
//                   >
//                     <p><span className="font-bold">Topic:</span> {scheduleItem.talk}</p>
//                     <p><span className="font-bold">Time:</span> {scheduleItem.time}</p>
//                     {/* Display speakers for the schedule */}
//                     {scheduleItem.speakers && scheduleItem.speakers.length > 0 && (
//                       <div>
//                         <h4 className="text-md font-bold mb-2">Speakers:</h4>
//                         {scheduleItem.speakers.map((speaker, index) => (
//                           <SpeakerCard key={index} speaker={speaker} />
//                         ))}
//                       </div>
//                     )}
//                     <button onClick={() => openModal(scheduleItem.id)}>Add Speakers</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {isModalOpen && (
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//               <div className="bg-white p-8 rounded-md">
//                 <h2 className="text-xl font-bold mb-4">Add Speakers</h2>
//                 <label className="block mb-2">
//                   Name:
//                   <input
//                     type="text"
//                     name="name"
//                     value={speakerData.name}
//                     onChange={(e) => setSpeakerData({ ...speakerData, name: e.target.value })}
//                   />
//                 </label>
//                 <label className="block mb-2">
//                   Bio:
//                   <input
//                     type="text"
//                     name="bio"
//                     value={speakerData.bio}
//                     onChange={(e) => setSpeakerData({ ...speakerData, bio: e.target.value })}
//                   />
//                 </label>
//                 <button
//                   className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
//                   onClick={addSpeaker}
//                 >
//                   Add Speaker
//                 </button>
//                 <button
//                   className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 ml-2"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {speakers.length > 0 && (
//             <div>
//               <h3 className="text-xl font-bold mb-2">All Speakers:</h3>
//               <div className='flex flex-row flex-wrap'>
//                 {speakers.map((speaker, index) => (
//                   <SpeakerCard key={index} speaker={speaker} />
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>
//       ) : (
//         <p>Loading conference details...</p>
//       )}
//     </div>
//   );
// };

// export default Schedule;



