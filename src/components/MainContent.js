import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import EditQuestionForm from './EditQuestionForm'; // Import form chỉnh sửa

const MainContent = ({ questions, onUpdateQuestion, user }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const reversedQuestions = [...questions].reverse();

  const handleEdit = (question) => {
    setEditingQuestion(question);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/questions/${id}`, {
        method: 'DELETE',
      });
      const updatedQuestions = questions.filter(q => q.id !== id);
      onUpdateQuestion(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    const updatedQuestions = questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    onUpdateQuestion(updatedQuestions);
    setEditingQuestion(null);
  };

  return (
    <div className="mainContent">
      {reversedQuestions.map((q, index) => (
        <QuestionCard 
          key={index} 
          title={q.title} 
          author={q.author} 
          date={q.date} 
          onEdit={() => handleEdit(q)} 
          onDelete={() => handleDelete(q.id)} 
          user={user}
        />
      ))}
      {editingQuestion && (
        <EditQuestionForm 
          question={editingQuestion} 
          onUpdateQuestion={handleUpdateQuestion} 
        />
      )}
    </div>
  );
};

export default MainContent;