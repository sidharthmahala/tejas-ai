import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { generateQuestions } from '../utils/api';
import { jsPDF } from 'jspdf';  // Import jsPDF for PDF generation

const GeneratedPaper = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { class1, subject, chapter, level, numQuestions, maxMarks } = location.state.config;
        const syllabus = `${subject} - ${chapter}`;

        // Fetch questions
        const questionPaper = await generateQuestions(class1, subject, syllabus, level, numQuestions, maxMarks);
        setQuestions(questionPaper.split('\n').filter(Boolean));  // Split by newlines and filter out empty strings

      } catch (err) {
        setError('Error fetching questions');
      }
    };

    fetchQuestions();
  }, [location]);

  // Function to copy questions to clipboard
  const copyToClipboard = () => {
    const formattedQuestions = questions.join('\n');
    navigator.clipboard.writeText(formattedQuestions);
    alert('Questions copied to clipboard!');
  };

  // Function to download the question paper as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.text("Generated Question Paper", 10, 10);
    doc.text(`Max Marks: ${location.state.config.maxMarks}`, 10, 20);
    doc.text(`Duration: 1 hour`, 10, 30);

    let yOffset = 40;
    questions.forEach((q) => {
      doc.text(`${q}`, 10, yOffset);
      yOffset += 10;
    });

    doc.save('question-paper.pdf');
  };

  return (
    <div className="generated-paper">
      <div className="paper-content">
        <h2>Generated Question Paper</h2>
        <p>Max Marks: {location.state.config.maxMarks}</p>
        <p>Duration: 1 hour</p>
        {error ? (
          <p>{error}</p>
        ) : questions.length > 0 ? (
          <>
            <div className="questions">
              {questions.map((q, index) => (
                <p key={index}>{q}</p>
              ))}
            </div>
            <div className="actions">
              <button onClick={copyToClipboard} style={buttonStyle}>Copy Questions</button>
              <button onClick={downloadPDF} style={buttonStyle}>Download PDF</button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default GeneratedPaper;
