

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConferences, postConference, updateConference, deleteConference, fetchConferenceById } from './redux/conferenceSlice';
import Header from './Header';
import ConferenceCard from './ConferenceCard';
import ConferenceFormModal from './ConferenceFormModal';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';



const HomePage = () => {
  const dispatch = useDispatch();
  const conferenceData = useSelector((state) => state.conferences.conferenceData) || [];
  const totalPages = useSelector((state) => state.conferences.totalPages) || 1;

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
  const [editMode, setEditMode] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateConferenceData = useCallback(() => {
    dispatch(fetchConferences({ page: pageNumber, size: pageSize }))
      .then((response) => {
        if (response.payload.content && response.payload.content.length === 0) {
          setPageNumber((prevPage) => Math.max(prevPage + 1, 1));
        }
      })
      .catch((error) => {
        console.error('Error fetching conference data:', error);
      });
  }, [dispatch, pageNumber, pageSize]);

  useEffect(() => {
    updateConferenceData();
  }, [updateConferenceData]);

  const handleEditConference = (conferenceId) => {
    setEditMode(true);
    setId(conferenceId);
    dispatch(fetchConferenceById({ conferenceId, setFormData, setShowModal }))
      .catch((error) => {
        console.error(`Error fetching conference data for editing:`, error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      dispatch(updateConference({ id, formData }))
        .then(() => {
          updateConferenceData();
          handleCloseModal();
        })
        .catch((error) => {
          console.error(`Error updating conference data:`, error);
        });
    } else {
      dispatch(postConference(formData))
        .then(() => {
          updateConferenceData();
          handleCloseModal();
        })
        .catch((error) => {
          console.error(`Error posting conference data:`, error);
        });
    }
  };

  const handleDeleteConference = (conferenceId) => {
    dispatch(deleteConference(conferenceId))
      .then(() => {
        updateConferenceData();
      })
      .catch((error) => {
        console.error(`Error deleting conference with ID ${conferenceId}:`, error);
      });
  };

  const handleViewConferenceClick = () => {
    setEditMode(false);
    setShowModal(true);
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
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-end mb-4">
          <button
            onClick={handleViewConferenceClick}
            className="bg-green-400 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
          >
            <AddTwoToneIcon />
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
        {conferenceData.length > 0 && (
          <div className="flex flex-wrap justify-center">
            {conferenceData.map((conference, index) => (
              <ConferenceCard
                key={index}
                conference={conference}
                deleteConference={handleDeleteConference}
                onEditClick={handleEditConference}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-4">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setPageNumber(page + 1)}
              className={`px-3 py-2 mx-1 rounded focus:outline-none ${
                page + 1 === pageNumber ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
