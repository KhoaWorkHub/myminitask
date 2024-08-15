import React from 'react';
import QuestionCard from './QuestionCard';

const MainContent = ({ questions }) => {
  const reversedQuestions = [...questions].reverse();

  return (
    <div className="mainContent">
      {reversedQuestions.map((q, index) => (
        <QuestionCard key={index} title={q.title} author={q.author} date={q.date} />
      ))}
    </div>
  );
};

export default MainContent;