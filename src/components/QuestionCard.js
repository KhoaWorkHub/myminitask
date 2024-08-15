import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const QuestionCard = ({ title, author, date }) => {
  return (
    <Card style={{ margin: '10px' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">Asked by: {author}</Typography>
        <Typography variant="body2">Date: {date}</Typography>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
