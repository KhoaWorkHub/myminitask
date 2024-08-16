import React, { useState } from 'react';
import { Snackbar, Alert, Drawer, List, ListItem, ListItemText, Divider, Checkbox, FormControlLabel } from '@mui/material';
import QuestionCard from './QuestionCard';
import EditQuestionForm from './EditQuestionForm';
import axios from 'axios';

const MainContent = ({ questions, setQuestions, user }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleEdit = (question) => {
    setEditingQuestion(question);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/questions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      setSnackbar({ open: true, message: 'Question deleted successfully', severity: 'success' });
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete question', severity: 'error' });
    }
  };

  const handleUpdateQuestion = async (updatedQuestion) => {
    try {
      const response = await axios.put(`http://localhost:3001/questions/${updatedQuestion.id}`, updatedQuestion);
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q.id === updatedQuestion.id ? response.data : q))
      );
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
        setQuestions(updatedQuestions);
        setSnackbar({ open: true, message: 'Response submitted successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to submit response', severity: 'error' });
      }
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const reversedQuestions = [...questions].reverse();

  const filteredQuestions = reversedQuestions.filter((q) => {
    if (selectedFilters.includes('responded') && selectedFilters.includes('unresponded')) {
      return true;
    } else if (selectedFilters.includes('responded')) {
      return q.adminResponse;
    } else if (selectedFilters.includes('unresponded')) {
      return !q.adminResponse;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex' }}>
      {user && user.role === 'admin' && (
        <Drawer
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
          variant="permanent"
        >
          <List>
            <ListItem>
              <ListItemText primary="Filter Questions" />
            </ListItem>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.includes('responded')}
                    onChange={() => handleFilterChange('responded')}
                  />
                }
                label="Responded"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.includes('unresponded')}
                    onChange={() => handleFilterChange('unresponded')}
                  />
                }
                label="Unresponded"
              />
            </ListItem>
          </List>
        </Drawer>
      )}
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