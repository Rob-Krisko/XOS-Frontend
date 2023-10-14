import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DesktopContainer = styled.div`
    height: 100vh;
    background-color: #e4e4e4;
    padding: 20px;
`;

const Button = styled.button`
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #b52b27;
    }
`;

const Desktop = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('token'); // ending session
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("Token removed successfully.");
            navigate('/');
        } else {
            console.log("Failed to remove token.");
        }
    }
    

    return (
        <DesktopContainer>
            <Button onClick={handleLogout}>Log Out</Button>
        </DesktopContainer>
    );
};

export default Desktop;
