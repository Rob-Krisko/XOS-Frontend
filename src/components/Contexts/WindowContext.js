import React, { createContext, useState } from 'react';
import Calculator from '../Calculator';
import MusicPlayer from '../musicPlayer';
import UserProfile from '../UserProfile';
import TextEditor from '../TextEditor';
import { v4 as uuidv4 } from 'uuid'

const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuVisible, setStartMenuVisible] = useState(false);

  const minimizeWindow = (id) => {
    console.log('minimizing window');
    setOpenWindows(prev => prev.map((window) => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const restoreWindow = (id) => {
    console.log('restoring window');
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false } : window
    ));
  };

  const closeWindow = (id) => {
    console.log('closing window');
    setOpenWindows(prev => prev.filter(window => window.id !== id));
  };

  const openApp = (appName) => {
    let appComponent = null;
    const id = uuidv4();

    switch (appName) {
      case 'Calculator':
        appComponent = <Calculator />;
        break;

      case 'Music Player':
        appComponent = <MusicPlayer />;
        break;

      case 'User Profile':
        appComponent = <UserProfile />;
        break;

      case 'Text Editor':
        appComponent = <TextEditor />;
        break;
        
      // add in other apps here
      default:
        appComponent = <div>Unknown App</div>;
    }

    setOpenWindows(prevWindows => [
      ...prevWindows, 
      { id, appName, isMinimized: false, component: appComponent }
    ]);
    setStartMenuVisible(false);
  };

  return (
    <WindowContext.Provider 
      value={{
        openWindows, 
        minimizeWindow, 
        restoreWindow, 
        closeWindow,
        openApp,
        startMenuVisible, 
        setStartMenuVisible
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export default WindowContext;
