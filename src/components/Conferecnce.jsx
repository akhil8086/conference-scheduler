

import { useState } from 'react';
import axios from 'axios';
import ConferenceList from './ConferenceList';
import Header from './Header';

function Conference() {
  const [conferenceData, setConferenceData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    foodOptions: [],
    hotelOptions: [],
    codeOfConduct: '',
  });
  const [id,setId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post('http://localhost:8080/conferences', formData)
      .then((response) => {
        console.log(response);
        setId(response.data.id);

        setFormData({
          name: '',
          description: '',
          date: '',
          location: '',
          foodOptions: [],
          hotelOptions: [],
          codeOfConduct: '',
        });
      })
      .catch((error) => {
        console.error('Error posting conference data:', error);
      });
    console.log(formData);
  };

  const [showData, setShowData] = useState(false);

  const fetchConferenceData = () => {
    axios
      // .get('http://localhost:8080/conferences/list-all')
      .get(`http://localhost:8080/conferences/${id}`)
      .then((response) => {
        setConferenceData(response.data);
        setShowData(true);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching conference data:', error);
      });
  };

  const deleteConference = (id) => {
    axios
      .delete(`http://localhost:8080/conferences/${id}`)
      .then((response) => {
        console.log(`Conference with ID ${id} deleted successfully.`);
        console.log(response);
        setConferenceData((prevData) => prevData.filter((conference) => conference.id !== id));
      })
      .catch((error) => {
        console.error(`Error deleting conference with ID ${id}:`, error);
      });
  };

  return (
    <div className="container mx-auto p-4n">
      <Header />
      <div className="bg-blue-200 border border-gray-300 shadow-md rounded p-4 mx-auto max-w-md mt-8">
        <h2 className="text-2xl font-bold mt-8 text-center">New Conference</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 bg-blue-100 p-4 rounded">
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">Name:</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">Description:</label>
    <input
      type="text"
      name="description"
      value={formData.description}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">Date:</label>
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">Location:</label>
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 font-semibold mb-2">Code of Conduct:</label>
    <textarea
      name="codeOfConduct"
      value={formData.codeOfConduct}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="flex justify-center">
    <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mx-2">
      New Conference 
    </button>
    <button onClick={fetchConferenceData} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mx-2">
      View Data
    </button>
  </div>
</form>

      </div>
      {showData && conferenceData && <ConferenceList conferenceData={conferenceData} deleteConference={deleteConference} />}
    </div>
  );
}

export default Conference;