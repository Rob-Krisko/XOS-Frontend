import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from './Modal';
import Login from './Login';
import Register from './Register';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #667eea, #764ba2);
    font-family: 'Arial', sans-serif;
    background-size: 200% 200%;
    animation: ${gradientShift} 15s ease infinite;
`;

const Title = styled.h1`
    font-size: 3.5em;
    color: #fff;
    margin-bottom: 20px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 15px 30px;
    margin: 10px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    &:hover {
        background-color: #fff;
        color: #333;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        transform: translateY(-3px); // Slightly raise the button
    }

    &:active {
        transform: translateY(-1px); // Subtle click effect
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalView, setModalView] = useState('login');

    return (
        <LandingContainer>
            <Title>Welcome to XOS</Title>
            <ButtonContainer>
                <Button onClick={() => { setShowModal(true); setModalView('login'); }}>Login</Button>
                <Button onClick={() => { setShowModal(true); setModalView('register'); }}>Register</Button>
            </ButtonContainer>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {modalView === 'login' ? <Login switchToRegister={() => setModalView('register')} /> : <Register switchToLogin={() => setModalView('login')} />}
            </Modal>
        </LandingContainer>
    );
};

export default LandingPage;
