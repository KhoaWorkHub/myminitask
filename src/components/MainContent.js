import React, { useState } from 'react';
import { Snackbar, Alert, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import QuestionCard from './QuestionCard';
import EditQuestionForm from './EditQuestionForm';
import axios from 'axios'; // Thêm thư viện axios

const MainContent = ({ questions, onUpdateQuestion, onAdminResponse, user }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filter, setFilter] = useState('all'); // Thêm trạng thái filter

  const handleEdit = (question) => { /* ... */ };

  const handleDelete = async (id) => { /* ... */ };

  const handleUpdateQuestion = (updatedQuestion) => { /* ... */ };

  const handleAdminResponse = async (questionId, response) => {
    // Tìm câu hỏi cần cập nhật
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
      const updatedQuestion = {
        ...questions[questionIndex],
        adminResponse: response,
        answerBy: user.email, // Thêm trường answerBy
        answerAtDate: new Date().toISOString() // Thêm trường answerAtDate
      };

      // Cập nhật câu hỏi trong danh sách
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex] = updatedQuestion;

      // Gọi API để ghi lại các thay đổi vào file db.json
      try {
        await axios.put(`http://localhost:3001/questions/${questionId}`, updatedQuestion);
        // Gọi hàm onAdminResponse để cập nhật phản hồi của admin
        onAdminResponse(questionId, response);
        setSnackbar({ open: true, message: 'Response submitted successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to submit response', severity: 'error' });
      }
    }
  };

  // Lọc câu hỏi dựa trên trạng thái filter
  const filteredQuestions = questions.filter((q) => {
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
              question={{ ...q, author: user ? q.author : q.author.split('@')[0] }} // Hiển thị tên thay vì email
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