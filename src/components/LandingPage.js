import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #333;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #555;
    }
`;

const LandingPage = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    return (
        <LandingContainer>
            <Title>Welcome to XOS</Title>
            <div>
                <Button onClick={() => setShowLoginModal(true)}>Login</Button>
                <Button onClick={() => setShowRegisterModal(true)}>Register</Button>
            </div>

            <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
                <Login />
            </Modal>

            <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
                <Register />
            </Modal>
        </LandingContainer>
    );
};

export default LandingPage;
