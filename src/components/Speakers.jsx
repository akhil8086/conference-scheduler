

import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Link } from 'react-router-dom';

function SpeakerCard({ speaker }) {
  return (
    <div className="p-4 mb-4 border border-gray-200 rounded-md">
      <h3 className="text-xl font-semibold">{speaker.name}</h3>
      <p className="mt-2">{speaker.bio}</p>
    </div>
  );
}

function Speakers() {
  const [speaker, setSpeaker] = useState(null);
  const [postData, setPostData] = useState({
    name: '',
    bio: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { id, ID } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/conferences/schedule/speaker/${id}/${ID}`, postData);
      console.log(response.data);
      setSpeaker(response.data);
      setPostData({
        name: '',
        bio: '',
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    async function fetchSpeakerDetails() {
      try {
        const response = await axios.get(`http://localhost:8080/conferences/schedule/view-speaker/${id}/${ID}`);
        setSpeaker(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSpeakerDetails();
  }, [id, ID]);

  return (
    <div>
      <Header />
      <div>
      <h1 className='text-2xl font-bold mb-2 text-center'>Add a Speaker</h1>
      </div>
      
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={postData.name}
              required
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio:
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={postData.bio}
              required
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover-bg-blue-600 focus:outline-none focus-bg-blue-600"
          >
            Update Speaker
          </button>
        </form>
        {speaker && <SpeakerCard speaker={speaker} />}
  
      <div className="flex flex-row justify-around">   
      <Link to={`/schedule/${id}`}>
      <button
      className="text-blue-500 hover:underline hover:text-blue-700 focus:outline-none"
      >
     back
     </button>
        </Link>

         
      <Link to={`/details/${id}`}>
      <button
      className="text-blue-500 hover:underline hover:text-blue-700 focus:outline-none"
      >
     Conference Details
     </button>
        </Link>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Speakers;
