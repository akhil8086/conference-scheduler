



import React, { useState, useEffect } from "react";
import axios from "axios";

function ConferenceSchedule() {
  const [scheduleData, setScheduleData] = useState([]);
  const [formData, setFormData] = useState({ talk: "", time: "" });

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/37");
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };
    fetchScheduleData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/conferences/schedule/37", formData);
      const response = await axios.get("http://localhost:8080/conferences/schedule/view-all/37");
      setScheduleData(response.data);
      setFormData({ talk: "", time: "" });
    } catch (error) {
      console.error("Error posting schedule data:", error);
    }
  };

  return (
    <div className="container">
      <h1>Conference Schedule</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="talk"
            value={formData.talk}
            onChange={handleChange}
            placeholder="Talk"
          />
        </div>
        <div>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
          />
        </div>
        <button type="submit">Add Schedule</button>
      </form>

      <div className="schedule-cards">
        {scheduleData.map((item, index) => (
          <div key={index} className="schedule-card">
            <h2>{item.talk}</h2>
            <p>{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceSchedule;

