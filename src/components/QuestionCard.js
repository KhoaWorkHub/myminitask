import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const QuestionCard = ({ question, onEdit, onDelete, onAdminResponse, user }) => {
  const [response, setResponse] = useState('');

  const handleResponseSubmit = () => {
    onAdminResponse(question.id, response);
    setResponse('');
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
    <Card style={{ margin: '10px', opacity: question.disabled ? 0.5 : 1 }}>
      <CardContent>
        <Typography variant="h6">{question.title}</Typography>
        <Typography variant="body2">Asked by: {question.author}</Typography>
        <Typography variant="body2">Date: {question.date}</Typography>
        {question.adminResponse && (
          <>
            <Typography variant="body2">Admin Response: {question.adminResponse}</Typography>
            <Typography variant="body2">Response Date: {formatDate(question.answerAtDate)}</Typography>
          </>
        )}
        {user?.role === 'student' && (
          <>
            <Button onClick={onEdit} variant="contained" color="primary" style={{ marginRight: '10px' }}>Edit</Button>
            <Button onClick={onDelete} variant="contained" color="secondary">Delete</Button>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <TextField
              label="Admin Response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              style={{ marginTop: '10px' }}
            />
            <Button onClick={handleResponseSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>Submit Response</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;