import React from 'react';
import styled from 'styled-components';

const WallpaperContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    z-index: -1;
`;

const Wallpaper = ({ image }) => {
    return (
        <WallpaperContainer style={{ backgroundImage: `url(${image})` }} />
    );
};

export default Wallpaper;
