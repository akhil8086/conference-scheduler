
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from './Header';
// import ConferenceCard from './ConferenceCard';
// import ConferenceFormModal from './ConferenceFormModal';
// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

// const HomePage = () => {
//   const [conferenceData, setConferenceData] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     location: '',
//   });
//   const [id, setId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [reloadData, setReloadData] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(2);
//   const [totalPages, setTotalPages] = useState(1);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const updateConference = (id, formData) => {
//     const apiEndpoint = `http://localhost:8080/conferences/update/${id}`;

//     axios
//       .put(apiEndpoint, formData)
//       .then((response) => {
//         setId(response.data.id);
//         setFormData({
//           name: '',
//           description: '',
//           startDate: '',
//           startTime: '',
//           endDate: '',
//           endTime: '',
//           location: '',
//         });

//         handleCloseModal();
//         setReloadData(true);
//       })
//       .catch((error) => {
//         console.error(`Error updating conference data:`, error);
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editMode) {
//       updateConference(id, formData);
//     } else {
//       const apiEndpoint = 'http://localhost:8080/conferences';

//       axios
//         .post(apiEndpoint, formData)
//         .then((response) => {
//           setId(response.data.id);
//           setFormData({
//             name: '',
//             description: '',
//             startDate: '',
//             startTime: '',
//             endDate: '',
//             endTime: '',
//             location: '',
//           });

//           handleCloseModal();
//           setReloadData(true);
//         })
//         .catch((error) => {
//           console.error(`Error posting conference data:`, error);
//         });
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/conferences/pageable?page=${pageNumber - 1}&size=${3}&sort=conferenceId,desc`)
//       .then((response) => {
//         setConferenceData(response.data.content);
//         setTotalPages(response.data.totalPages);
//         setShowData(true);
//         setReloadData(false);
//         if (response.data.content.length === 0) {
//           setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching conference data:', error);
//       });
//   }, [reloadData, pageNumber, pageSize]);

//   const deleteConference = (conferenceId) => {
//     axios
//       .delete(`http://localhost:8080/conferences/${conferenceId}`)
//       .then(() => {
//         setConferenceData((prevData) =>
//           prevData.filter((conference) => conference.conferenceId !== conferenceId)
//         );

//         if (conferenceData.length === 1) {
//           setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
//         }
//       })
//       .catch((error) => {
//         console.error(`Error deleting conference with ID ${id}:`, error);
//       });
//   };

//   const [showData, setShowData] = useState(false);

//   const handleViewConferenceClick = () => {
//     setEditMode(false);
//     setShowModal(true);
//   };

//   const handleEditConference = (id) => {
//     setEditMode(true);
//     setId(id);
//     axios.get(`http://localhost:8080/conferences/${id}`)
//       .then((response) => {
//         setFormData(response.data);
//         setShowModal(true);
//       })
//       .catch((error) => {
//         console.error(`Error fetching conference data for editing:`, error);
//       });
//   };

//   const handleCloseModal = () => {
//     setEditMode(false);
//     setShowModal(false);
//     setFormData({
//       name: '',
//       description: '',
//       startDate: '',
//       startTime: '',
//       endDate: '',
//       endTime: '',
//       location: '',
//     });
//   };

//   return (
//     <div>
//       <Header />
//       <div className="container mx-auto p-4">
//         <div className="flex flex-row justify-end mb-4">
//           <button
//             onClick={handleViewConferenceClick}
//             className="bg-green-400 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
//           >
//             <AddTwoToneIcon />
//           </button>
//         </div>

//         {showModal && (
//           <ConferenceFormModal
//             showModal={showModal}
//             onClose={handleCloseModal}
//             onSubmit={handleSubmit}
//             formData={formData}
//             onChange={handleChange}
//           />
//         )}
//         {showData && (
//           <div className="flex flex-wrap justify-center">
//             {conferenceData.map((conference, index) => (
//               <ConferenceCard
//                 key={index}
//                 conference={conference}
//                 deleteConference={deleteConference}
//                 onEditClick={handleEditConference}
//               />
//             ))}
//           </div>
//         )}
//         <div className="flex justify-center mt-4">
//           {[...Array(totalPages).keys()].map((page) => (
//             <button
//               key={page}
//               onClick={() => setPageNumber(page + 1)}
//               className={`px-3 py-2 mx-1 rounded focus:outline-none ${
//                 page + 1 === pageNumber ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
//               }`}
//             >
//               {page + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;






import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConferences, postConference, updateConference, deleteConference } from './redux/conferenceSlice';
import axios from 'axios';
import Header from './Header';
import ConferenceCard from './ConferenceCard';
import ConferenceFormModal from './ConferenceFormModal';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const [reloadData, setReloadData] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateConferenceData = () => {
    dispatch(fetchConferences({ page: pageNumber, size: pageSize }))
      .then((response) => {
        if (response.payload.content && response.payload.content.length === 0) {
          setPageNumber((prevPage) => Math.max(prevPage + 1, 1));
        }
      })
      .catch((error) => {
        console.error('Error fetching conference data:', error);
      });
  };

  useEffect(() => {
    updateConferenceData();
  }, [dispatch, pageNumber, pageSize, reloadData]);

  const handleEditConference = (conferenceId) => {
    setEditMode(true);
    setId(conferenceId);
    axios
      .get(`${BASE_URL}/conferences/${conferenceId}`)
      .then((response) => {
        setFormData(response.data);
        setShowModal(true);
      })
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


