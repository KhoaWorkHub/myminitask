import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';

const NewQuestionForm = ({ onQuestionSubmit, user }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newQuestion = { title, author: user.email, date: new Date().toISOString().split('T')[0] };

    const response = await fetch('http://localhost:3001/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    });

    if (response.ok) {
      const createdQuestion = await response.json();
      onQuestionSubmit(createdQuestion);
      setTitle('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </Paper>
  );
};

export default NewQuestionForm;