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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const loginUser = async () => {
        console.log('Attempting to log in...');
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            console.log('Server response:', response.data);
            setMessage(response.data.message);
            if (response.status === 200) { 
                console.log("Token received:", response.data.token);
                localStorage.setItem('token', response.data.token); // Store the token in local storage for sessions
                navigate('/desktop');
            } else {
                console.log("Login unsuccessful.");
            }
        } catch (error) {
            console.log('Error while logging in:', error);
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button onClick={loginUser}>Login</Button>
            {message && <Message>{message}</Message>}
            <Button onClick={switchToRegister}>Register a new account</Button>
        </FormContainer>
    );
}

export default Login;
