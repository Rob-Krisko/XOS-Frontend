import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import ReactModal from 'react-modal';
import axios from 'axios';

const AreaContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
    position: relative;
`;

const CalendarContainer = styled.div`
    position: absolute;
    bottom: 120%;
    right: 0;
    z-index: 60;
    background: white;
    width: 500px;
    max-height: 800px;
    overflow-y: auto; 
`;

const StyledFullCalendar = styled(FullCalendar)`
    .fc-header-toolbar {
        color: black;
    }
    .fc-daygrid-day-number {
        color: black;
    }
`;


const DateTimeDisplay = styled.div`
    text-align: right;
    color: white;
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
    color: white;
`;


const WeatherIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 5px;
`;

const StyledModal = styled(ReactModal)`
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    outline: none;
`;

const ModalForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ModalInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const ModalLabel = styled.label`
    margin-bottom: 5px;
`;

const ModalButton = styled.button`
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ModalCheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const ModalCheckbox = styled.input`
    margin-right: 5px;
`;

const ModalTitle = styled.h2`
    margin-top: 0;
`;


const EventModal = ({ isOpen, onClose, onSubmit, onDelete, eventInfo }) => {
    const [title, setTitle] = useState(eventInfo?.title || '');
    const [start, setStart] = useState(eventInfo?.start || '');
    const [end, setEnd] = useState(eventInfo?.end || '');
    const [allDay, setAllDay] = useState(eventInfo?.allDay || false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, start, end, allDay, id: eventInfo?.id || createEventId() });
        onClose();
    };

    useEffect(() => {
        if (eventInfo) {
            setTitle(eventInfo.title || '');
            setStart(eventInfo.start || '');
            setEnd(eventInfo.end || '');
            setAllDay(eventInfo.allDay || false);
        }
    }, [eventInfo]);

    const handleDelete = () => {
        if (eventInfo?.id) {
            onDelete(eventInfo.id); 
        }
        onClose();
    };

    return (
        <StyledModal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <ModalTitle>{eventInfo?.id ? 'Edit Event' : 'Add Event'}</ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
                <ModalLabel>Title</ModalLabel>
                <ModalInput type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event Title" />
                
                <ModalLabel>Start</ModalLabel>
                <ModalInput type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
                
                <ModalLabel>End</ModalLabel>
                <ModalInput type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />

                <ModalCheckboxContainer>
                    <ModalCheckbox type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
                    <ModalLabel>All Day</ModalLabel>
                </ModalCheckboxContainer>

                <ModalButton type="submit">Save</ModalButton>
                <ModalButton type="button" onClick={onClose}>Cancel</ModalButton>
            </ModalForm>
            {eventInfo?.id && (
                <ModalButton type="button" onClick={handleDelete}>Delete Event</ModalButton>
            )}
        </StyledModal>
    );
};

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
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const username = localStorage.getItem('username');
    console.log("Username: " + username);
    const jwtToken = localStorage.getItem('token'); 
    console.log("Token: " + jwtToken);
    const [userId, setUserId] = useState(null); 

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/userid/${username}`, {
                    headers: { Authorization: `Bearer ${jwtToken}` }
                });
                setUserId(response.data.userId);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };
    
        if (username && jwtToken) {
            fetchUserId();
        }
    }, [username, jwtToken]);
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`/api/events/${userId}`, {
                    headers: { Authorization: `Bearer ${jwtToken}` }
                });
                setEvents(response.data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end)
                })));
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (userId && jwtToken) {
            fetchEvents();
        }
    }, [userId, jwtToken]);

    const handleDateTimeClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateSelect = (selectInfo) => {
        setSelectedEvent({
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        });
        setModalOpen(true);
        setShowCalendar(false);
    };

    const handleEventClick = (clickInfo) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.start,
            end: clickInfo.event.end,
            allDay: clickInfo.event.allDay
        });
        setModalOpen(true);
        setShowCalendar(false);
    };

    const handleEventSubmit = async (eventData) => {
        try {
            if (eventData.id) {
                const response = await axios.put(`/api/events/${eventData.id}`, eventData);
                setEvents(events.map(event => (event.id === eventData.id ? response.data : event)));
            } else {
                const response = await axios.post('/api/events', eventData);
                setEvents([...events, response.data]);
            }
            setModalOpen(false);
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleEventDelete = async (eventId) => {
        try {
            await axios.delete(`/api/events/${eventId}`);
            setEvents(events.filter(event => event.id !== eventId));
            setModalOpen(false);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <AreaContainer>
            <Weather />
            <DateTimeDisplay onClick={handleDateTimeClick}>
                <TimeDisplay>{currentTime.toLocaleTimeString()}</TimeDisplay>
                <DateDisplay>{currentTime.toLocaleDateString()}</DateDisplay>
            </DateTimeDisplay>
            <EventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleEventSubmit}
                onDelete={handleEventDelete}
                eventInfo={selectedEvent}
            />
            {showCalendar && (
                <CalendarContainer ref={calendarRef}>
                    <StyledFullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        events={events}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                    />
                </CalendarContainer>
            )}
        </AreaContainer>
    );
};


function createEventId() {
    return String(eventGuid++);
}

let eventGuid = 0;

export default NotificationArea;