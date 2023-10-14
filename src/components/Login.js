import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // ensure this import exists

function Login() {
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
            if (response.data.success) {
                console.log("Token received:", response.data.token);
                localStorage.setItem('token', response.data.token); // Storing JWT for session handling
                navigate('/desktop');
            } else {
                console.log("Login unsuccessful.");
            }
        } catch (error) {
            console.log('Error while logging in:', error);
            setMessage(error.response.data.message);
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            <input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={loginUser}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
