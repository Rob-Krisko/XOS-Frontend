import React from 'react';
import styled from 'styled-components';
import AppItem from './AppItem';
import { useNavigate } from 'react-router-dom';

const StartMenuContainer = styled.div`
    position: absolute;
    bottom: 50px; // Adjust this based on your taskbar height
    left: 10px;
    width: 250px; // Adjust width as needed
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 10;
`;

const StartMenuHeader = styled.div`
    padding: 10px;
    background-color: #e6e6e6;
    border-bottom: 1px solid #ccc;
    font-weight: bold;
`;

const StartMenuList = styled.div`
    padding: 10px;
`;

const LogoutButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-top: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        background-color: #c9302c;
    }
`;

const StartMenu = ({ show, onAppClick }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/');
    };

    return (
        <StartMenuContainer show={show}>
            <StartMenuHeader>Applications</StartMenuHeader>
            <StartMenuList>
                <AppItem onClick={() => onAppClick('App 1')}>App 1</AppItem>
                <AppItem onClick={() => onAppClick('App 2')}>App 2</AppItem>
                <AppItem onClick={() => onAppClick('Calculator')}>Calculator</AppItem>
            </StartMenuList>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </StartMenuContainer>
    );
};

export default StartMenu;
