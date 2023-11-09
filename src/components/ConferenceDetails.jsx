


import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";

function ConferenceDetails() {
  const [conferences, setConferences] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:8080/conferences/list-all")
      .then((response) => {
        setConferences(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/conferences/${id}`)
      .then(() => {
        setConferences(conferences.filter((conference) => conference.id !== id));

      })
      .catch((error) => console.error("Error deleting conference:", error));
  };

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold mb-4 text-center">Conference List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-6xl">
        {conferences.map((conference) => (
          <div key={conference.id} className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{conference.name}</h2>
            <p className="text-gray-600 mb-2">{`Date: ${conference.date}`}</p>
            <p className="text-gray-600 mb-2">{`Location: ${conference.location}`}</p>
            <p className="text-gray-600 mb-2">{`Description: ${conference.description}`}</p>
            <p className="text-gray-600 mb-2">{`Code of Conduct: ${conference.codeOfConduct}`}</p>

            <button
              onClick={() => handleDelete(conference.id)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceDetails;
