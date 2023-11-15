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
    &.drag-handle {
        cursor: move;
      }
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

const Window = ({ title, children, id, style }) => {
    const { minimizeWindow, closeWindow } = useContext(WindowContext);

    const handleMinimize = () => {
        minimizeWindow(id);
    };

    const handleClose = () => {
        closeWindow(id);
    };

    return (
        <Rnd
            dragHandleClassName="drag-handle"
            default={{
                x: 100,
                y: 100,
                width: 640,
                height: 480,
            }}
            minWidth={300}
            minHeight={200}
            bounds="parent"

            enableResizing={{
                bottom: true,
                bottomLeft: true,
                bottomRight: true,
                left: true,
                right: true,
                top: true,
                topLeft: true,
                topRight: true,
            }}
        >
                <WindowContainer style={style}>
                    <WindowHeader className="drag-handle">
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
