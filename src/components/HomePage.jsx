


import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import ConferenceCard from './ConferenceCard';
import ConferenceFormModal from './ConferenceFormModal';

function HomePage() {
  const [conferenceData, setConferenceData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
  });
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = editMode
      ? `http://localhost:8080/conferences/update/${id}`
      : 'http://localhost:8080/conferences';

    axios
      .request({
        method: editMode ? 'put' : 'post',
        url: apiEndpoint,
        data: formData,
      })
      .then((response) => {
        setId(response.data.id);
        setFormData({
          name: '',
          description: '',
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          location: '',
        });
        console.log(response);
        handleCloseModal();
        setReloadData(true);
      })
      .catch((error) => {
        console.error(`Error ${editMode ? 'updating' : 'posting'} conference data:`, error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/conferences/list-all')
      .then((response) => {
        setConferenceData(response.data);
        setShowData(true);
        console.log(response);
        setReloadData(false);
      })
      .catch((error) => {
        console.error('Error fetching conference data:', error);
      });
  }, [reloadData]);

  const deleteConference = (id) => {
    axios
      .delete(`http://localhost:8080/conferences/${id}`)
      .then((response) => {
        console.log(`Conference with ID ${id} deleted successfully.`);
        console.log(response);
        setConferenceData((prevData) =>
          prevData.filter((conference) => conference.id !== id)
        );
      })
      .catch((error) => {
        console.error(`Error deleting conference with ID ${id}:`, error);
      });
  };

  const [showData, setShowData] = useState(false);

  const handleViewConferenceClick = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleEditConference = (id) => {
    setEditMode(true);
    setId(id);

    axios.get(`http://localhost:8080/conferences/${id}`)
      .then((response) => {
        setFormData(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error(`Error fetching conference data for editing:`, error);
      });
  };

  const handleCloseModal = () => {
    setEditMode(false);
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div>
        <button
          onClick={handleViewConferenceClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Conference
        </button>
      </div>

      {showModal && (
        <ConferenceFormModal
          showModal={showModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
        />
      )}
      {showData && (
        <div className="flex flex-wrap justify-center">
          {conferenceData
            .slice()
            .reverse()
            .map((conference) => (
              <ConferenceCard
                key={conference.id}
                conference={conference}
                deleteConference={deleteConference}
                onEditClick={handleEditConference}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;




