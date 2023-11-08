

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ConferenceSchedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [formData, setFormData] = useState({ talk: "", time: "" });
  const params = useParams();
  const scheduleId = params.id;
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isFormEnabled, setFormEnabled] = useState(true);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${scheduleId}`);
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };
    fetchScheduleData();
  }, [scheduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/conferences/schedule/${scheduleId}`, formData);
      const response = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${scheduleId}`);
      setScheduleData(response.data);
      setFormData({ talk: "", time: "" });
    } catch (error) {
      console.error("Error posting schedule data:", error);
    }
  };

  const handleEdit = async (index) => {
    setFormEnabled(false);
    setEditingIndex(index);
    const scheduleItem = scheduleData[index];
    setFormData({
      talk: scheduleItem.talk,
      time: scheduleItem.time,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const scheduleItem = scheduleData[editingIndex];
      await axios.put(`http://localhost:8080/conferences/${scheduleId}/${scheduleItem.id}`, formData);
      const response = await axios.get(`http://localhost:8080/conferences/schedule/view-all/${scheduleId}`);
      setScheduleData(response.data);
      setEditingIndex(-1);
      setFormEnabled(true);
      setFormData({ talk: "", time: "" });
    } catch (error) {
      console.error("Error updating schedule data:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Conference Schedule</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col mb-4 w-64">
            <input
              type="text"
              name="talk"
              value={formData.talk}
              onChange={handleChange}
              placeholder="Talk"
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col mb-4 w-64">
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Time"
              className="border p-2 rounded"
            />
          </div>
          {isFormEnabled ? (
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Add Schedule
            </button>
          ) : null}
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduleData.map((item, index) => (
            <div key={index} className="bg-blue-200 border p-4 rounded">
              {editingIndex === index ? (
                <div>
                  <button onClick={handleSaveEdit} className="bg-green-500 text-white p-2 rounded">
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold text-center">{item.talk}</h2>
                  <p className="text-gray-500 text-center">{item.time}</p>
                  <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white p-2 rounded">
                    Edit
                  </button>
                  <Link to={`/speakers/${scheduleId}/${item.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Speakers
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ConferenceSchedule;
