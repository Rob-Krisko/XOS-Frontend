import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const Button = styled.button`
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #555;
    }
`;

const LandingPage = () => {
    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    return (
        <LandingContainer>
            <div>
                {/* Use the navigate function to navigate to the desired route */}
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/register')}>Register</Button>
            </div>
        </LandingContainer>
    );
};

export default LandingPage;
