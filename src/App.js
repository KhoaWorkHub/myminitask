import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('http://localhost:3001/questions');
      setQuestions(response.data);
    };

    fetchQuestions();
  }, []);

  const handleNewQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleAdminResponse = (questionId, response) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, adminResponse: response, responseDate: new Date().toISOString() } : q
    );
    setQuestions(updatedQuestions);
  };

  const filteredQuestions = questions.filter((q) => !q.disabled);

  const userFilteredQuestions = user?.role === 'student'
    ? filteredQuestions.filter((q) => q.author === user.email)
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
          {userFilteredQuestions.length > 0 ? (
            <MainContent
              questions={userFilteredQuestions}
              onUpdateQuestion={handleUpdateQuestion}
              onAdminResponse={handleAdminResponse}
              user={user}
            />
          ) : (
            <p>No questions found for this user.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;