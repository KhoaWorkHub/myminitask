import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [role] = useState('student'); // Đặt giá trị mặc định cho role là 'student'

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, role };
    onLogin(user);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Ẩn đi trường nhập vai trò */}
        <Button type="submit" variant="contained">Login</Button>
      </Box>
    </Paper>
  );
};

export default Login;