import React, { useState } from 'react';
import { Snackbar, Alert, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import QuestionCard from './QuestionCard';
import EditQuestionForm from './EditQuestionForm';
import axios from 'axios';

const MainContent = ({ questions, onUpdateQuestion, onAdminResponse, user }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filter, setFilter] = useState('all');

  const handleEdit = (question) => {
    setEditingQuestion(question);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/questions/${id}`);
      setSnackbar({ open: true, message: 'Question deleted successfully', severity: 'success' });
      onUpdateQuestion((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete question', severity: 'error' });
    }
  };

  const handleUpdateQuestion = async (updatedQuestion) => {
    try {
      const response = await axios.put(`http://localhost:3001/questions/${updatedQuestion.id}`, updatedQuestion);
      onUpdateQuestion(response.data);
      setEditingQuestion(null);
      setSnackbar({ open: true, message: 'Question updated successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update question', severity: 'error' });
    }
  };

  const handleAdminResponse = async (questionId, response) => {
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
      const updatedQuestion = {
        ...questions[questionIndex],
        adminResponse: response,
        answerBy: user.email,
        answerAtDate: new Date().toISOString()
      };

      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex] = updatedQuestion;

      try {
        await axios.put(`http://localhost:3001/questions/${questionId}`, updatedQuestion);
        onAdminResponse(questionId, response);
        setSnackbar({ open: true, message: 'Response submitted successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to submit response', severity: 'error' });
      }
    }
  };

  // Đảo ngược thứ tự của mảng questions
  const reversedQuestions = [...questions].reverse();

  const filteredQuestions = reversedQuestions.filter((q) => {
    if (filter === 'responded') {
      return q.adminResponse;
    } else if (filter === 'unresponded') {
      return !q.adminResponse;
    }
    return true;
  });

  return (
    <div>
      <Drawer
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <List>
          <ListItem>
            <ListItemText primary="Filter Questions" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setFilter('all')}>
            <ListItemText primary="All" />
          </ListItem>
          <ListItem button onClick={() => setFilter('responded')}>
            <ListItemText primary="Responded" />
          </ListItem>
          <ListItem button onClick={() => setFilter('unresponded')}>
            <ListItemText primary="Unresponded" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {filteredQuestions.map((q, index) => (
            <QuestionCard 
              key={index} 
              question={{ ...q, author: user ? q.author : q.author.split('@')[0] }} 
              onEdit={() => handleEdit(q)} 
              onDelete={() => handleDelete(q.id)} 
              onAdminResponse={handleAdminResponse}
              user={user}
            />
          ))}
        </div>
        {editingQuestion && (
          <EditQuestionForm
            question={editingQuestion}
            onUpdateQuestion={handleUpdateQuestion}
            onClose={() => setEditingQuestion(null)}
          />
        )}
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainContent;