import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState(''); // Added fullName state
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
                username, email, password, fullName  // Added fullName to the payload
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
        <div>
            <h2>Register</h2>
            <input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                value={fullName}  // Added input field for fullName
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
            />
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />
            <button onClick={registerUser}>Register</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
