import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notificationMessage } from '../Helpers/notificationHelper';

const Login = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation logic
    if (!email || !password) {
      return setError('Both fields are required');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError('Invalid email format');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    const user = { email };
    navigate('/'); // redirect to kanban board
    notificationMessage('success', 'Kanban login Successfully');
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user])

  return (
    <Box
      sx={{
        width: 300,
        mx: 'auto',
        mt: 10,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" mb={2}>Kanban Dashboard Login</Typography>
      {error && <Typography color="error" variant="body2">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          autoComplete='off'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          autoComplete='off'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
