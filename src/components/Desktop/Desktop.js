import React, { useContext } from 'react';
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

    return (
        <WindowProvider> 
            <DesktopContainer>
                <Wallpaper image={defaultWallpaper} />
                
                {openWindows.map((window, index) => (
                    <Window
                        key={index}
                        id={index}
                        title={window.appName}
                        style={{ display: window.isMinimized ? 'none' : 'block' }}
                    >

                        {window.component}
                    </Window>
                ))}
                <StartMenu show={startMenuVisible} onAppClick={openApp} />
                <Taskbar onStartClick={handleStartClick} />
            </DesktopContainer>
        </WindowProvider>
    );
};

export default Desktop;
