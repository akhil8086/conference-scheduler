

// import React from "react";
// import eventDetails from "./eventdetails";
// import Header from "./header";

// const Homepage = () => {
//   return (
//     <div>
//       <div>
//         <Header />
//       </div>

  
//       <div>
//       <h1>{eventDetails.name}</h1>
//       <p>{eventDetails.description}</p>
//       <p>Date: {eventDetails.date}</p>
//       <p>Location: {eventDetails.location}</p>
//       </div>
    
//     </div>
//   );
// };

// export default Homepage;


// import Header from "./Header";
// import eventDetails from "./eventdetails";
// const Homepage = () => {
//   return (
//     <div>
//       <Header />

//       <h1>SPEAKERS</h1>

//       <div className="border border-gray-300 p-4 m-4 rounded-lg shadow-md bg-white w-72 h-96">
//         <h1 className="text-2xl font-semibold">{eventDetails.name}</h1>
//         <p className="text-gray-600">{eventDetails.description}</p>
//         <p className="text-gray-600">Date: {eventDetails.date}</p>
//         <p className="text-gray-600">Location: {eventDetails.location}</p>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



// import React, { useState } from "react";
// import Header from "./Header";

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([
//     {
//       id: 1,
//       name: "Speaker 1",
//       topic: "Topic 1",
//     },
//     {
//       id: 2,
//       name: "Speaker 2",
//       topic: "Topic 2",
//     },
//   ]);

//   const addSpeaker = () => {
//     const newSpeaker = {
//       id: speakers.length + 1,
//       name: "New Speaker",
//       topic: "New Topic",
//     };
//     setSpeakers([...speakers, newSpeaker]);
//   };

//   return (
//     <div>
//       <Header />

//       <h1>SPEAKERS</h1>

//       <div className="border border-gray-300 p-4 m-4 rounded-lg shadow-md bg-white w-72">
//         <h2 className="text-xl font-semibold">Speakers</h2>
//         <ul>
//           {speakers.map((speaker) => (
//             <li key={speaker.id}>
//               <p className="text-gray-600">
//                 <strong>{speaker.name}</strong>
//               </p>
//               <p className="text-gray-600">{speaker.topic}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <button
//         onClick={addSpeaker}
//         className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
//       >
//         Add Speaker
//       </button>
//     </div>
//   );
// };

// export default Homepage;



// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import axios from "axios"; 
// import Icon from "../assets/Home.svg"

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });

//   const fetchSpeakers = async () => {
//     try {
//       const response = await axios.get("API_ENDPOINT/speakers"); 
//       setSpeakers(response.data);
//     } catch (error) {
//       console.error("Error fetching speakers:", error);
//     }
//   };

//   const addSpeaker = async () => {
//     try {
//       const response = await axios.post("API_ENDPOINT/speakers", newSpeaker);
//       setSpeakers([...speakers, response.data]);
//       setNewSpeaker({ name: "", topic: "" });
//     } catch (error) {
//       console.error("Error adding speaker:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSpeakers(); 
//   }, []);

//   return (
//     <div>
//       <Header />

//       <div className="mt-8">

//       <img src={Icon} className="mx-auto" />

//       </div>

//       <h1 className="text-2xl ml-5 mt-8">SPEAKERS</h1>


//       <div className="flex justify-center">

//         <input
//           type="text"
//           placeholder="Speaker Name"
//           value={newSpeaker.name}
//           onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
//          className="flex mr-8 p-5 rounded-lg"

//         />
//         <input
//           type="text"
//           placeholder="Topic"
//           value={newSpeaker.topic}
//           onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
//           className="flex mr-8 p-5 rounded-2xl"

//         />
//        <button className="border border-black rounded-lg p-5" onClick={addSpeaker}>Add Speaker</button>

//       </div>

//       <div className="border border-gray-300 p-4 m-4 rounded-lg shadow-md bg-white w-72 mx-auto my-20">

//         <h2 className="text-xl font-semibold">Speakers</h2>
//         <ul>
//           {speakers.map((speaker) => (
//             <li key={speaker.id}>
//               <p className="text-gray-600">
//                 <strong>{speaker.name}</strong>
//               </p>
//               <p className="text-gray-600">{speaker.topic}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



// import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import axios from "axios"; 
// import Icon from "../assets/Home.svg"

// const Homepage = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });

//   const fetchSpeakers = async () => {
//     try {
//       const response = await axios.get("API_ENDPOINT/speakers"); 
//       setSpeakers(response.data);
//     } catch (error) {
//       console.error("Error fetching speakers:", error);
//     }
//   };

//   const addSpeaker = async () => {
//     try {
//       const response = await axios.post("API_ENDPOINT/speakers", newSpeaker);
//       const newSpeakerData = response.data;
//       setSpeakers([...speakers, newSpeakerData]);
//       setNewSpeaker({ name: "", topic: "" });
//     } catch (error) {
//       console.error("Error adding speaker:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSpeakers(); 
//   }, []);

//   return (
//     <div>
//       <Header />

//       <div className="mt-8">
//         <img src={Icon} className="mx-auto" />
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

//       <div className="border border-gray-300 p-4 m-4 rounded-lg shadow-md bg-white w-72 mx-auto my-20">
//         <h2 className="text-xl font-semibold">Speakers</h2>
//         <ul>
//           {speakers.map((speaker) => (
//             <li key={speaker.id}>
//               <p className="text-gray-600">
//                 <strong>{speaker.name}</strong>
//               </p>
//               <p className="text-gray-600">{speaker.topic}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Homepage;



import React, { useState } from "react";
import Header from "./Header";
import Icon from "../assets/Home.svg"
import { Link } from "react-router-dom";
// import Conference from "./Conferecnce";

const Homepage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [newSpeaker, setNewSpeaker] = useState({ name: "", topic: "" });

  const addSpeaker = () => {
    // Check if both name and topic are not empty
    if (newSpeaker.name && newSpeaker.topic) {
      // Create a copy of the current speakers array and add the new speaker
      const updatedSpeakers = [...speakers, newSpeaker];
      setSpeakers(updatedSpeakers);

      // Clear the input fields
      setNewSpeaker({ name: "", topic: "" });
    }
  };

  return (
    <div>
      <Header />

      <Link to="/conference">
        <button>New Conference</button>
      </Link>

      <div className="mt-8">
        <img src={Icon} className="mx-auto" />
      </div>
      {/* <div>
        <Conference />
      </div> */}
      
      <h1 className="text-2xl ml-5 mt-8">SPEAKERS</h1>

      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Speaker Name"
          value={newSpeaker.name}
          onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
          className="flex mr-8 p-5 rounded-lg"
        />
        <input
          type="text"
          placeholder="Topic"
          value={newSpeaker.topic}
          onChange={(e) => setNewSpeaker({ ...newSpeaker, topic: e.target.value })}
          className="flex mr-8 p-5 rounded-2xl"
        />
        <button className="border border-black rounded-lg p-5" onClick={addSpeaker}>
          Add Speaker
        </button>
      </div>

      <div className="border border-gray-300 p-4 m-4 rounded-lg shadow-md bg-white w-72 mx-auto my-20">
        <h2 className="text-xl font-semibold">Speakers</h2>
        <ul>
          {speakers.map((speaker, index) => (
            <li key={index}>
              <p className="text-gray-600">
                <strong>{speaker.name}</strong>
              </p>
              <p className="text-gray-600">{speaker.topic}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Homepage;

















