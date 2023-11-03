import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    color: white;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #4a4a4a;
    }
`;

const StartButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            Start
        </Button>
    );
};

export default StartButton;
