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

import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get("API_ENDPOINT/schedule"); // Replace with the actual API endpoint
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchScheduleData();
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold my-4">Conference Schedule</h2>
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Session</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4">{item.time}</td>
                <td className="py-2 px-4">{item.session}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;

