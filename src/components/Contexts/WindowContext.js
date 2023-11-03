import React, { createContext, useState } from 'react';
import Calculator from '../Calculator';

const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [startMenuVisible, setStartMenuVisible] = useState(false);

  const minimizeWindow = (id) => {
    setOpenWindows(prev => prev.map((window, index) => 
      index === id ? { ...window, isMinimized: true } : window
    ));
  };

  const restoreWindow = (appName) => {
    setOpenWindows(prev => prev.map(window => 
      window.appName === appName ? { ...window, isMinimized: false } : window
    ));
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter((_, index) => index !== id));
  };

  const openApp = (appName) => {
    let appComponent = null;
  
    switch (appName) {
      case 'Calculator':
        appComponent = <Calculator />;
        break;
      // add in other apps here
      default:
        appComponent = <div>Unknown App</div>;
    }

    setOpenWindows(prevWindows => [
      ...prevWindows, 
      { appName, isMinimized: false, component: appComponent }
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
