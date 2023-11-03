import React, { useContext } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import WindowContext from '../Contexts/WindowContext';

const WindowContainer = styled.div`
    background: #FFF;
    border: 1px solid #ccc;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    overflow: hidden;
`;

const WindowHeader = styled.div`
    background: #4a4a4a;
    color: #FFF;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
`;

const Title = styled.span`
`;

const WindowControls = styled.div`
    button {
        background: none;
        border: none;
        color: #FFF;
        padding: 0 10px;
        cursor: pointer;
        font-size: 1em;

        &:hover {
            color: #e0e0e0;
        }
    }
`;

const WindowContent = styled.div`
    padding: 20px;
`;

const Window = ({ title, children, id }) => {
    const { minimizeWindow, closeWindow } = useContext(WindowContext);

    const handleMinimize = () => {
        minimizeWindow(title);
    };

    const handleClose = () => {
        closeWindow(title);
    };

    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 320,
                height: 200,
            }}
            minWidth={320}
            minHeight={200}
            bounds="parent"
        >
            <WindowContainer>
                <WindowHeader>
                    <Title>{title}</Title>
                    <WindowControls>
                        <button onClick={handleMinimize}>_</button>
                        <button onClick={handleClose}>X</button>
                    </WindowControls>
                </WindowHeader>
                <WindowContent>
                    {children}
                </WindowContent>
            </WindowContainer>
        </Rnd>
    );
};

export default Window;
