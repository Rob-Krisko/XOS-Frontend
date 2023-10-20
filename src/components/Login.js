import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #34495e;
  color: white;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #5a7591;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const Message = styled.p`
  font-size: 0.9em;
  color: #e74c3c;
`;

const FormTitle = styled.h2`
  color: white;
  font-size: 2em;
  margin-bottom: 15px;
  text-align: center;
`;

function Login({ switchToRegister }) {
  const [formData, setFormData] = useState({
      username: '',
      password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const loginUser = async () => {
    console.log('Trying to log in with data:', formData);
      const { username, password } = formData;
      try {
          const response = await axios.post('http://localhost:5000/login', { username, password });
          setMessage(response.data.message);
          if (response.status === 200) { 
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('username', response.data.username);
              navigate('/desktop');
          }
      } catch (error) {
          setMessage(error.response?.data?.message || 'Login failed');
      }
  };

  return (
    <FormContainer>
        <FormTitle>Login</FormTitle>
        <Input 
            name="username"
            value={formData.username} 
            onChange={handleChange}
            placeholder="Username"
        />
        <Input 
            name="password"
            type="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="Password"
        />
        <Button onClick={loginUser}>Login</Button>
        {message && <Message>{message}</Message>}
        <Button onClick={switchToRegister}>Register a new account</Button>
    </FormContainer>
  );
}

export default Login;
