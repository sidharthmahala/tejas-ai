import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeadForm.css';

const LeadForm = () => {
  const [teacherData, setTeacherData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the lead info and navigate to the next page
    navigate('/exam-config', { state: { teacherData } });
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <h2>Enter Teacher Details</h2>
      <input type="text" placeholder="Name" required value={teacherData.name} onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })} />
      <input type="email" placeholder="Email" required value={teacherData.email} onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })} />
      <input type="tel" placeholder="Phone" required value={teacherData.phone} onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })} />
      <button type="submit">Next</button>
    </form>
  );
};

export default LeadForm;
