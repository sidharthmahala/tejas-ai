import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadForm from './components/LeadForm';
import ExamConfigForm from './components/ExamConfigForm';
import GeneratedPaper from './components/GeneratedPaper';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LeadForm />} />
          <Route path="/exam-config" element={<ExamConfigForm />} />
          <Route path="/generate" element={<GeneratedPaper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
