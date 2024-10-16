import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const subjects = ['English', 'Hindi', 'Sanskrit', 'Social Studies', 'Mathematics', 'Science', 'History', 'Geography'];
const levels = ['Easy', 'Medium', 'Hard', 'Mixed'];
const class1s = ['6th','7th','8th','9th','10th','11th','12th'];

const ExamConfigForm = () => {
  const [config, setConfig] = useState({ class1:'',subject: '', chapter:'', level: '', numQuestions: '', maxMarks: '' });
  const navigate = useNavigate();
  const location = useLocation(); // Get teacherData from the previous page

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send config to the backend or API and then navigate to the result
    navigate('/generate', { state: { config, teacherData: location.state.teacherData } });
  };

  return (
    <form onSubmit={handleSubmit} className="exam-config-form">
      <h2>Configure Exam Paper</h2>
      <select required value={config.class1} onChange={(e) => setConfig({ ...config, class1: e.target.value })}>
        <option value="">Select Class</option>
        {class1s.map((class1) => (
          <option key={class1} value={class1}>{class1}</option>
        ))}
      </select>
      <select required value={config.subject} onChange={(e) => setConfig({ ...config, subject: e.target.value })}>
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>

      <input type="text" placeholder="Unit 1 to unit 3.." required value={config.chapter} onChange={(e) => setConfig({ ...config, chapter: e.target.value })} />

      <select required value={config.level} onChange={(e) => setConfig({ ...config, level: e.target.value })}>
        <option value="">Select Level</option>
        {levels.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <input type="number" placeholder="Number of Questions" required value={config.numQuestions} onChange={(e) => setConfig({ ...config, numQuestions: e.target.value })} />
      <input type="number" placeholder="Max Marks" required value={config.maxMarks} onChange={(e) => setConfig({ ...config, maxMarks: e.target.value })} />
      <button type="submit">Generate Paper</button>
    </form>
  );
};

export default ExamConfigForm;
