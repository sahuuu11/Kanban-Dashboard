import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notificationMessage } from '../Helpers/notificationHelper';

const Login = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    // Simple validation logic
    if (!email.trim()) {
      newErrors.email = "Email is required!";
    }
    if (!password) {
      newErrors.password = "Password is required!";
    }

    if (email && !/\S+@\S+\.\S+/.test(email?.trim())) {
      newErrors.email = "Invalid email!";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
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
      {/* {error && <Typography color="error" variant="body2">{error}</Typography>} */}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          autoComplete='off'
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError((prev) => ({ ...prev, email: '' })) }}
        />
        {error.email && <small style={{ color: 'red' }}>{error.email}</small>}
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          autoComplete='off'
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError((prev) => ({ ...prev, password: '' })) }}
        />
        {error.password && <small style={{ color: 'red' }}>{error.password}</small>}
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
