import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch initial questions from JSON Server
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleNewQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="sidebarContainer">
          <Sidebar onNewQuestion={handleNewQuestion} />
        </div>
        <div className="mainContent">
          <MainContent questions={questions} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;