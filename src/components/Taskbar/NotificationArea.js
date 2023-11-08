import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AreaContainer = styled.div`
    display: flex;
    justify-content: flex-end; 
    padding: 0 20px;
    color: white;
`;

const DateTimeDisplay = styled.div`
    text-align: right;
`;

const TimeDisplay = styled.div`
    font-size: 0.9em;
`;

const DateDisplay = styled.div`
    font-size: 0.8em;
`;

const WeatherDisplay = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;


const WeatherIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 5px;
`;

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=db65b051b1ce560a620362330f5e0542&units=imperial`);
                const data = await response.json();

                setWeather(data);
            }, (error) => {
                console.error("Geolocation error:", error);
            });
        };

        fetchWeather();
        const interval = setInterval(fetchWeather, 600000);
        
        return () => clearInterval(interval);
    }, []);

    let content = <div>Loading weather...</div>;

    if (weather && weather.main && weather.weather && weather.weather.length > 0) {
        const { main: { temp }, weather: [weatherDetails] } = weather;
        const { description, icon } = weatherDetails;

        if (temp !== undefined && description && icon) {
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
            content = (
                <WeatherDisplay>
                    <WeatherIcon src={iconUrl} alt="Weather icon" />
                    <span>{`${temp}°F, ${description}`}</span>
                </WeatherDisplay>
            );
        } else {
            content = <div>Error: Weather data is incomplete.</div>;
        }
    } else if (weather && weather.cod) {
        content = <div>Error: {weather.message}</div>;
    }

    return content;
};




const NotificationArea = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <AreaContainer>
            <Weather />
            <DateTimeDisplay>
                <TimeDisplay>{currentTime.toLocaleTimeString()}</TimeDisplay>
                <DateDisplay>{currentTime.toLocaleDateString()}</DateDisplay>
            </DateTimeDisplay>
        </AreaContainer>
    );
};

export default NotificationArea;
