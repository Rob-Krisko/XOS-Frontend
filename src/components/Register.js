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

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const registerUser = async () => {
        console.log('Attempting to register...');
        if(password !== confirmPassword) {
            console.log('Passwords do not match!');
            setMessage("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username, email, password, fullName 
            });
            console.log('Server response:', response.data);
            setMessage(response.data.message);
            if (response.data.success) {
                navigate('/login');
            } else {
                console.log("Registration unsuccessful.");
            }
        } catch (error) {
            console.log('Error while registering:', error);
            setMessage(error.response.data.message);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Register</FormTitle>
            <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <Input 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
            />
            <Input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />
            <Button onClick={registerUser}>Register</Button>
            {message && <Message>{message}</Message>}
        </FormContainer>
    );
}

export default Register;
