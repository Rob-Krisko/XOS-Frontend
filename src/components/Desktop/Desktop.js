import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import StartMenu from '../StartMenu/StartMenu';
import Taskbar from '../Taskbar/Taskbar';
import Window from '../Window/Window';
import Wallpaper from './Wallpaper';
import { WindowProvider } from '../Contexts/WindowContext';
import WindowContext from '../Contexts/WindowContext';
import defaultWallpaper from '../../images/default.jpg';


const DesktopContainer = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
`;

const Desktop = () => {
    const { openWindows, startMenuVisible, setStartMenuVisible, openApp } = useContext(WindowContext);

    const handleStartClick = () => {
        setStartMenuVisible(!startMenuVisible);
    };

    useEffect(() => {
        console.log('Start Menu visibility on mount:', startMenuVisible);
    }, []);

    return (
        <DesktopContainer>
            <Wallpaper image={defaultWallpaper} />
            
            {openWindows.map((window) => (
                <Window
                    key={window.id}
                    id={window.id}
                    title={window.appName}
                    style={{ display: window.isMinimized ? 'none' : 'block' }}
                >
                    {window.component}
                </Window>
            ))}
            <StartMenu show={startMenuVisible} onAppClick={openApp} />
            <Taskbar onStartClick={handleStartClick} />
        </DesktopContainer>
    );
};

export default Desktop;

