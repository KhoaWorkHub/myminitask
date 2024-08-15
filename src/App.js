import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './components/Login';
import React, { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
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

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleUpdateQuestion = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };

  // const filteredQuestions = user?.role === 'student'
  //   ? questions.filter(q => q.author === user.name)
  //   : questions;

    const filteredQuestions = questions.filter(q => !q.disabled);

    const userFilteredQuestions = user?.role === 'student'
      ? filteredQuestions.filter(q => q.author === user.name)
      : filteredQuestions;

  return (
    <div>
      <Header />
      <div className="container">
        <div className="sidebarContainer">
          {user ? (
            <Sidebar onNewQuestion={handleNewQuestion} user={user} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
        <div className="mainContent">
          <MainContent questions={userFilteredQuestions} onUpdateQuestion={handleUpdateQuestion} user={user} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;