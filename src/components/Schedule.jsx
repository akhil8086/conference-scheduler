// import React from "react";
// import Header from "./header";

// const Schedule = () => {
//   const scheduleData = [ 
//     { time: "9:00 AM", session: "Registration and Welcome Address" },
//     { time: "10:00 AM", session: "Keynote by Speaker 1" },
//   ];

//   return (
//     <div>
//         <Header />
//       <h2>Conference Schedule</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Time</th>
//             <th>Session</th>
//           </tr>
//         </thead>
//         <tbody>
//           {scheduleData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.time}</td>
//               <td>{item.session}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Schedule;

// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import axios from "axios";

// const Schedule = () => {
//   const [scheduleData, setScheduleData] = useState([]);

//   useEffect(() => {
//     const fetchScheduleData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/conferences/schedule/35"); 
//         setScheduleData(response.data);
//       } catch (error) {
//         console.error("Error fetching schedule data:", error);
//       }
//     };

//     fetchScheduleData();
//   }, []);

//   return (
//     <div className="bg-gray-100">
//       <Header />
//       <div className="container mx-auto p-6">
//         <h2 className="text-2xl font-bold my-4">Conference Schedule</h2>
//         <table className="w-full border-collapse border border-gray-300 bg-white">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4">Time</th>
//               <th className="py-2 px-4">Session</th>
//             </tr>
//           </thead>
//           <tbody>
//             {scheduleData.map((item, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4">{item.time}</td>
//                 <td className="py-2 px-4">{item.session}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Schedule;



// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import axios from "axios";

// const Schedule = () => {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [formData, setFormData] = useState({
//     time: "",
//     session: "",
//   });

//   useEffect(() => {
//     // Fetch schedule data when the component mounts
//     const fetchScheduleData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/1");
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
//       // Send a POST request to add a new schedule item
//       await axios.post("http://localhost:8080/conferences/schedule/35", formData);
//       // After a successful POST, refetch the schedule data to update the list
//       fetchScheduleData();
//       // Reset the form data
//       setFormData({ time: "", session: "" });
//     } catch (error) {
//       console.error("Error posting schedule data:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100">
//       <Header />
//       <div className="container mx-auto p-6">
//         <h2 className="text-2xl font-bold my-4">Conference Schedule</h2>

//         {/* Add a form to add new schedule items */}
//         <form onSubmit={handleSubmit} className="mb-4">
//           <div className="flex mb-4">
//             <input
//               type="text"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               placeholder="Time"
//               className="w-1/3 p-2 border rounded focus:outline-none"
//             />
//             <input
//               type="text"
//               name="session"
//               value={formData.session}
//               onChange={handleChange}
//               placeholder="Session"
//               className="w-2/3 p-2 border rounded focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
//             >
//               Add Schedule
//             </button>
//           </div>
//         </form>

//         {/* Display schedule data as cards */}
//         {scheduleData.map((item, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md p-4 my-2">
//             <p className="text-lg font-bold">{item.time}</p>
//             <p className="text-sm">{item.session}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Schedule;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Schedule() {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [formData, setFormData] = useState({ talk: "", time: "" });

//   useEffect(() => {
//     const fetchScheduleData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/conferences/schedule/35");
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
//       await axios.post("http://localhost:8080/conferences/schedule/35", formData);
//       const response = await axios.get("http://localhost:8080/conferences/schedule/35");
//       setScheduleData(response.data);
//       setFormData({ talk: "", time: "" });
//     } catch (error) {
//       console.error("Error posting schedule data:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Schedule</h1>

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

// export default Schedule;



import React, { useState, useEffect } from "react";
import axios from "axios";

function ConferenceSchedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [formData, setFormData] = useState({ talk: "", time: "" });

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/37");
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
      await axios.post("http://localhost:8080/conferences/schedule/37", formData);
      const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/37");
      setScheduleData(response.data);
      setFormData({ talk: "", time: "" });
    } catch (error) {
      console.error("Error posting schedule data:", error);
    }
  };

  return (
    <div className="container">
      <h1>Conference Schedule</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="talk"
            value={formData.talk}
            onChange={handleChange}
            placeholder="Talk"
          />
        </div>
        <div>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
          />
        </div>
        <button type="submit">Add Schedule</button>
      </form>

      <div className="schedule-cards">
        {scheduleData.map((item, index) => (
          <div key={index} className="schedule-card">
            <h2>{item.talk}</h2>
            <p>{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceSchedule;

