import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Conference() {
    const [eventName, setEventName] = useState('Default Event Name');
  const [conferenceData, setConferenceData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    foodOptions: '',
    hotelOptions: '',
    codeOfConduct: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to your backend to add conference data
    axios.post('http://your-backend-url/api/conference', formData)
      .then((response) => {
        // Handle success or refresh the conference data
        fetchConferenceData();
      })
      .catch((error) => {
        console.error('Error posting conference data:', error);
      });
  };

  const fetchConferenceData = () => {
    // Fetch conference data from your backend
    axios.get('http://your-backend-url/api/conference')
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Conference Details</h1>
      {conferenceData && (
        <div>
          <p>ID: {conferenceData.id}</p>
          <p>Name: {conferenceData.name}</p>
          <p>Description: {conferenceData.description}</p>
          <p>Date: {conferenceData.date}</p>
          <p>Location: {conferenceData.location}</p>
          <p>Food Options: {conferenceData.foodOptions.join(', ')}</p>
          <p>Hotel Options: {conferenceData.hotelOptions.join(', ')}</p>
          <p>Code of Conduct: {conferenceData.codeOfConduct}</p>
          
          <div className="mb-4">
        <label className="block font-semibold">Event Name:</label>
        <input
          type="text"
          name="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>

        </div>
      )}

      <h2 className="text-2xl font-bold mt-8">Post New Conference Data</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Food Options (comma-separated):</label>
          <input
            type="text"
            name="foodOptions"
            value={formData.foodOptions}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Hotel Options (comma-separated):</label>
          <input
            type="text"
            name="hotelOptions"
            value={formData.hotelOptions}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Code of Conduct:</label>
          <textarea
            name="codeOfConduct"
            value={formData.codeOfConduct}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Post Conference Data</button>
      </form>
    </div>
  );
}

export default Conference;