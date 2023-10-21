import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DesktopContainer = styled.div`
    height: 100vh;
    background-color: #e4e4e4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #b52b27;
    }
`;


const Desktop = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Attempting to log out...');
        console.log('Logging out...');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token removed successfully.");
            navigate('/');
        } else {
            console.log("Failed to remove token.");
        }
    }
    
    const handleOpenProfile = () => {
        console.log('Attempting to open profile...');
        const username = localStorage.getItem('username');
        if (username) {
            navigate(`/profile/${username}`);
        } else {
            console.log("No username found.");
        }
    }
    
    return (
        <DesktopContainer>
            <Button onClick={handleLogout}>Log Out</Button>
            <Button onClick={handleOpenProfile}>Profile</Button>
        </DesktopContainer>
    );
};

export default Desktop;
