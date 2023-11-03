import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
    padding: 8px 12px;
    margin: 4px 0;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const AppItem = ({ children, onClick }) => {
    return (
        <Item onClick={onClick}>
            {children}
        </Item>
    );
};

export default AppItem;
