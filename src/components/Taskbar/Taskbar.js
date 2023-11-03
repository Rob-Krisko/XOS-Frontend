import React, { useContext } from 'react';
import styled from 'styled-components';
import StartButton from './StartButton';
import NotificationArea from './NotificationArea';
import WindowContext from '../Contexts/WindowContext';

const TaskbarContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #303030;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.5);
    z-index: 20;
`;

const OpenWindowsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    overflow-x: auto;
    margin: 0 10px;
`;

const WindowButton = styled.div`
    margin: 0 5px;
    padding: 5px 10px;
    background: #454545;
    color: white;
    cursor: pointer;

    &:hover {
        background: #565656;
    }
`;

const Taskbar = ({ onStartClick }) => {
    const { openWindows, restoreWindow, minimizedWindows } = useContext(WindowContext);

    return (
        <TaskbarContainer>
            <StartButton onClick={onStartClick} />
            <OpenWindowsContainer>
                {openWindows.map(window => (
                    <WindowButton key={window.appName} onClick={() => restoreWindow(window.appName)}>
                        {window.appName}
                    </WindowButton>
                ))}
            </OpenWindowsContainer>
            <NotificationArea />
        </TaskbarContainer>
    );
};

export default Taskbar;
