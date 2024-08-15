import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const QuestionCard = ({ title, author, date, onEdit, onDelete, disabled, user }) => {
  return (
    <Card style={{ margin: '10px', opacity: disabled ? 0.5 : 1 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">Asked by: {author}</Typography>
        <Typography variant="body2">Date: {date}</Typography>
        {user?.role === 'student' && (
        <>
        <Button onClick={onEdit} variant="contained" color="primary" style={{ marginRight: '10px' }}>Edit</Button>
        <Button onClick={onDelete} variant="contained" color="secondary">Delete</Button>
        </>
  )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;