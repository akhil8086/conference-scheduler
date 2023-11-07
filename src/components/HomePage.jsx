




// import React, { useState } from "react";
// import Header from "./Header";
// import Icon from "../assets/Home.svg";

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });

//   const addSpeaker = () => {
//     if (newSpeaker.name && newSpeaker.topic) {
//       const updatedSpeakers = [...speakers, newSpeaker];
//       setSpeakers(updatedSpeakers);
//       setNewSpeaker({ name: "", topic: "" });
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" alt="Home Icon" />
//       </div>
//       <h1 className="text-2xl ml-5 mt-8">SPEAKERS</h1>
//       <div className="flex justify-center">
//         <input
//           type="text"
//           placeholder="Speaker Name"
//           value={newSpeaker.name}
//           onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//           className="flex mr-8 p-5 rounded-lg"
//         />
//         <input
//           type="text"
//           placeholder="Topic"
//           value={newSpeaker.topic}
//           onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//           className="flex mr-8 p-5 rounded-2xl"
//         />
//         <button className="border border-black rounded-lg p-5" onClick={addSpeaker}>
//           Add Speaker
//         </button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-6">
//         {speakers.map((speaker, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
//             <h2 className="text-xl font-semibold">{speaker.name}</h2>
//             <p className="text-gray-600">{speaker.topic}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Homepage;


// import React, { useState } from "react";
// import Header from "./Header";
// import Icon from "../assets/Home.svg";
// import Conference from "./Conferecnce";

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });

//   const addSpeaker = () => {
//     if (newSpeaker.name && newSpeaker.topic) {
//       const updatedSpeakers = [...speakers, newSpeaker];
//       setSpeakers(updatedSpeakers);
//       setNewSpeaker({ name: "", topic: "" });
//     }
//   };

//   const deleteSpeaker = (index) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers.splice(index, 1);
//     setSpeakers(updatedSpeakers);
//   };

//   return (
//     <div>
//       <Header />
//       <Conference />
//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" alt="Home Icon" />
//       </div>
//       <h1 className="text-3xl ml-[20px] mt-8 semibold">SPEAKERS</h1>
//       <div className="flex justify-center">
//   <div className="flex flex-col space-y-4">
//     <input
//       type="text"
//       placeholder="Speaker Name"
//       value={newSpeaker.name}
//       onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//       className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//     />
//     <input
//       type="text"
//       placeholder="Topic"
//       value={newSpeaker.topic}
//       onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//       className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//     />
//     <button
//       className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//       onClick={addSpeaker}
//     >
//       Add Speaker
//     </button>
//   </div>
// </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-6">
//         {speakers.map((speaker, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
//             <h2 className="text-xl font-semibold">{speaker.name}</h2>
//             <p className="text-gray-600">{speaker.topic}</p>
//             <button
//               className="bg-red-500 text-white p-2 mt-2 rounded"
//               onClick={() => deleteSpeaker(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Homepage;



// import React, { useState } from "react";
// import Header from "./Header";
// import Icon from "../assets/Home.svg";
// import Conference from "./Conferecnce";

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });
//   const [showConference, setShowConference] = useState(false); // State variable for showing/hiding Conference

//   const addSpeaker = () => {
//     if (newSpeaker.name && newSpeaker.topic) {
//       const updatedSpeakers = [...speakers, newSpeaker];
//       setSpeakers(updatedSpeakers);
//       setNewSpeaker({ name: "", topic: "" });
//     }
//   };

//   const deleteSpeaker = (index) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers.splice(index, 1);
//     setSpeakers(updatedSpeakers);
//   };

//   return (
//     <div>
//       <Header />
//       {showConference && <Conference />}
//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" alt="Home Icon" />
//       </div>
//       <h1 className="text-3xl ml-[20px] mt-8 font-semibold">SPEAKERS</h1>
//       <div className="flex justify-center">
//         <div className="flex flex-col space-y-4">
//           <input
//             type="text"
//             placeholder="Speaker Name"
//             value={newSpeaker.name}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Topic"
//             value={newSpeaker.topic}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//           />
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//             onClick={addSpeaker}
//           >
//             Add Speaker
//           </button>
//         </div>
//       </div>
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4"
//         onClick={() => setShowConference(!showConference)}
//       >
//         {showConference ? "Hide Conference" : "Show Conference"}
//       </button>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-6">
//         {speakers.map((speaker, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
//           >
//             <h2 className="text-xl font-semibold">{speaker.name}</h2>
//             <p className="text-gray-600">{speaker.topic}</p>
//             <button
//               className="bg-red-500 text-white p-2 mt-2 rounded"
//               onClick={() => deleteSpeaker(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Homepage;


// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link from React Router
// import Header from "./Header";
// import Icon from "../assets/Home.svg";

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });

//   const addSpeaker = () => {
//     if (newSpeaker.name && newSpeaker.topic) {
//       const updatedSpeakers = [...speakers, newSpeaker];
//       setSpeakers(updatedSpeakers);
//       setNewSpeaker({ name: "", topic: "" });
//     }
//   };

//   const deleteSpeaker = (index) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers.splice(index, 1);
//     setSpeakers(updatedSpeakers);
//   };

//   return (
//     <div>
//       <Header />
//       <Link to="/conference"> 
//         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4 mx-[100px]">
//           Go to Conference
//         </button>
//       </Link>
//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" alt="Home Icon" />
//       </div>
      
//       <h1 className="text-3xl ml-[20px] mt-8 font-semibold">SPEAKERS</h1>
//       <div className="flex justify-center">
//         <div className="flex flex-col space-y-4">
//           <input
//             type="text"
//             placeholder="Speaker Name"
//             value={newSpeaker.name}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Topic"
//             value={newSpeaker.topic}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//           />
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//             onClick={addSpeaker}
//           >
//             Add Speaker
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-6">
//         {speakers.map((speaker, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
//           >
//             <h2 className="text-xl font-semibold">{speaker.name}</h2>
//             <p className="text-gray-600">{speaker.topic}</p>
//             <button
//               className="bg-red-500 text-white p-2 mt-2 rounded"
//               onClick={() => deleteSpeaker(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Homepage;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import Icon from "../assets/Home.svg";

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });
//   const [conferenceData, setConferenceData] = useState(null);

//   const addSpeaker = () => {
//     if (newSpeaker.name && newSpeaker.topic) {
//       const updatedSpeakers = [...speakers, newSpeaker];
//       setSpeakers(updatedSpeakers);
//       setNewSpeaker({ name: "", topic: "" });
//     }
//   };

//   const deleteSpeaker = (index) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers.splice(index, 1);
//     setSpeakers(updatedSpeakers);
//   };

//   useEffect(() => {
//     fetch("http://localhost:8080/conferences/21")
//       .then((response) => response.json())
//       .then((data) => setConferenceData(data))
//       .catch((error) => console.error("Error fetching conference data:", error));
//   }, []);

//   return (
//     <div>
//       <Header />
//       <Link to="/conference">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg my-4 mx-[100px]">
//           Go to Conference
//         </button>
//       </Link>
//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" alt="Home Icon" />
//       </div>

//       <h1 className="text-3xl ml-[20px] mt-8 font-semibold">SPEAKERS</h1>
//       <div className="flex justify-center">
//         <div className="flex flex-col space-y-4">
//           <input
//             type="text"
//             placeholder="Speaker Name"
//             value={newSpeaker.name}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Topic"
//             value={newSpeaker.topic}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//           />
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
//             onClick={addSpeaker}
//           >
//             Add Speaker
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-6">
//         {speakers.map((speaker, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
//           >
//             <h2 className="text-xl font-semibold">{speaker.name}</h2>
//             <p className="text-gray-600">{speaker.topic}</p>
//             <button
//               className="bg-red-500 text-white p-2 mt-2 rounded"
//               onClick={() => deleteSpeaker(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//       {conferenceData ? (
//         <div className="conference-card">
//           <h1 className="text-3xl">Conference Details</h1>
//           <div className="conference-info">
//             <p>Title: {conferenceData.title}</p>
//             <p>Date: {conferenceData.date}</p>
//             <p>Location: {conferenceData.location}</p>
//           </div>
//         </div>
//       ) : (
//         <p>Loading conference data...</p>
//       )}
//     </div>
//   );
// };

// export default Homepage;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Header from "./Header";
// import Icon from "../assets/Home.svg";
// import axios from "axios"; // Import Axios

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });
//   const [conferenceData, setConferenceData] = useState(null);

//   const addSpeaker = () => {
//     if (newSpeaker.name && newSpeaker.topic) {
//       const updatedSpeakers = [...speakers, newSpeaker];
//       setSpeakers(updatedSpeakers);
//       setNewSpeaker({ name: "", topic: "" });
//     }
//   };

//   const deleteSpeaker = (index) => {
//     const updatedSpeakers = [...speakers];
//     updatedSpeakers.splice(index, 1);
//     setSpeakers(updatedSpeakers);
//   };

//   useEffect(() => {
    
//     axios.get("http://localhost:8080/conferences/21")
//       .then((response) => {
//         setConferenceData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching conference data:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <Header />
//       <Link to="/conference">
//         <button className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded-lg my-4 mx-[100px]">
//           Go to Conference
//         </button>
//       </Link>
//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" alt="Home Icon" />
//       </div>

//       <h1 className="text-3xl ml-[20px] mt-8 font-semibold">SPEAKERS</h1>
//       <div className="flex justify-center">
//         <div className="flex flex-col space-y-4">
//           <input
//             type="text"
//             placeholder="Speaker Name"
//             value={newSpeaker.name}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus-outline-none focus-ring focus-border-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Topic"
//             value={newSpeaker.topic}
//             onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//             className="px-4 py-3 rounded-md border border-gray-300 focus-outline-none focus-ring focus-border-blue-500"
//           />
//           <button
//             className="bg-blue-500 hover-bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover-scale-105"
//             onClick={addSpeaker}
//           >
//             Add Speaker
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4 mx-4 my-6">
//         {speakers.map((speaker, index) => (
//           <div
//             key={index}
//             className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
//           >
//             <h2 className="text-xl font-semibold">{speaker.name}</h2>
//             <p className="text-gray-600">{speaker.topic}</p>
//             <button
//               className="bg-red-500 text-white p-2 mt-2 rounded"
//               onClick={() => deleteSpeaker(index)}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//       {conferenceData ? (
//         <div className="conference-card">
//           <h1 className="text-3xl">Conference Details</h1>
//           <div className="conference-info">
//             <p>Title: {conferenceData.title}</p>
//             <p>Date: {conferenceData.date}</p>
//             <p>Location: {conferenceData.location}</p>
//           </div>
//         </div>
//       ) : (
//         <p>Loading conference data...</p>
//       )}
//     </div>
//   );
// };

// export default Homepage;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Icon from "../assets/Home.svg";
import axios from "axios"; // Import Axios

const Homepage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });
  const [conferenceData, setConferenceData] = useState(null);

  const addSpeaker = () => {
    if (newSpeaker.name && newSpeaker.topic) {
      const updatedSpeakers = [...speakers, newSpeaker];
      setSpeakers(updatedSpeakers);
      setNewSpeaker({ name: "", topic: "" });
    }
  };

  const deleteSpeaker = (index) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers.splice(index, 1);
    setSpeakers(updatedSpeakers);
  };

  useEffect(() => {
    // Use Axios for data fetching
    axios.get("http://localhost:8080/conferences/$(id)")
      .then((response) => {
        setConferenceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching conference data:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Link to="/conference">
        <button className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded-lg my-4 mx-[100px]">
          Go to Conference
        </button>
      </Link>
      <div className="mt-8">
        <img src={Icon} className="mx-auto" alt="Home Icon" />
      </div>

      <h1 className="text-3xl ml-[20px] mt-8 font-semibold">SPEAKERS</h1>
      <div className="flex justify-center">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Speaker Name"
            value={newSpeaker.name}
            onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
            className="px-4 py-3 rounded-md border border-gray-300 focus-outline-none focus-ring focus-border-blue-500"
          />
          <input
            type="text"
            placeholder="Topic"
            value={newSpeaker.topic}
            onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
            className="px-4 py-3 rounded-md border border-gray-300 focus-outline-none focus-ring focus-border-blue-500"
          />
          <button
            className="bg-blue-500 hover-bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover-scale-105"
            onClick={addSpeaker}
          >
            Add Speaker
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm-grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4 mx-4 my-6">
        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
          >
            <h2 className="text-xl font-semibold">{speaker.name}</h2>
            <p className="text-gray-600">{speaker.topic}</p>
            <button
              className="bg-red-500 text-white p-2 mt-2 rounded"
              onClick={() => deleteSpeaker(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {conferenceData ? (
        <div className="conference-card">
          <h1 className="text-3xl">Conference Details</h1>
          <div className="conference-info">
            <p>Title: {conferenceData.title}</p>
            <p>Date: {conferenceData.date}</p>
            <p>Location: {conferenceData.location}</p>
          </div>
        </div>
      ) : (
        <p>Loading conference data...</p>
      )}
    </div>
  );
};

export default Homepage;







