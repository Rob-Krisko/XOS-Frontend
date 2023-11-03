import React from 'react';
import styled from 'styled-components';

const AreaContainer = styled.div`
    padding: 0 20px;
    color: white;
    display: flex;
    align-items: center;
`;

const TimeDisplay = styled.div`
    font-size: 0.9em;
`;

const NotificationArea = () => {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <AreaContainer>
            <TimeDisplay>
                {currentTime.toLocaleTimeString()}
            </TimeDisplay>
        </AreaContainer>
    );
};

export default NotificationArea;
