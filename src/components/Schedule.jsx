



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function ConferenceSchedule() {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [formData, setFormData] = useState({ talk: "", time: "" });

//   useEffect(() => {
//     const fetchScheduleData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/37");
//         setScheduleData(response.data);
//       } catch (error) {
//         console.error("Error fetching schedule data:", error);
//       }
//     };
//     fetchScheduleData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/conferences/schedule/37", formData);
//       const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/37");
//       setScheduleData(response.data);
//       setFormData({ talk: "", time: "" });
//     } catch (error) {
//       console.error("Error posting schedule data:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Conference Schedule</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="talk"
//             value={formData.talk}
//             onChange={handleChange}
//             placeholder="Talk"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             placeholder="Time"
//           />
//         </div>
//         <button type="submit">Add Schedule</button>
//       </form>

//       <div className="schedule-cards">
//         {scheduleData.map((item, index) => (
//           <div key={index} className="schedule-card">
//             <h2>{item.talk}</h2>
//             <p>{item.time}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ConferenceSchedule;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

function ConferenceSchedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [formData, setFormData] = useState({ talk: "", time: "" });

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/50");
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };
    fetchScheduleData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/conferences/schedule/50", formData);
      const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/50");
      setScheduleData(response.data);
      setFormData({ talk: "", time: "" });
    } catch (error) {
      console.error("Error posting schedule data:", error);
    }
  };

  return (
    <div >
      <Header />
      <div className="container p-4 ml-[500px] mr-auto">
      <h1 className="text-2xl font-bold mb-4 mt-5 ml-[130px]">Conference Schedule</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col mb-4 w-[500px]">
          <input
            type="text"
            name="talk"
            value={formData.talk}
            onChange={handleChange}
            placeholder="Talk"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col mb-4 w-[500px]">
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            className="border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-[190px] mr-auto">
          Add Schedule
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scheduleData.map((item, index) => (
          <div key={index} className="bg-blue-200 border p-4 rounded">
         <h2 className="text-lg font-semibold text-center">{item.talk}</h2>
          <p className="text-gray-500 text-center">{item.time}</p>

          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ConferenceSchedule;
