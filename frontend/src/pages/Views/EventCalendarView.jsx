import React, {useState} from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import './EventCalendar.css';
import DayView from "./DayView.jsx";

const EventCalendarView = () => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const [selectedDay, setSelectedDay] = useState(null);

    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <div className="container">
            <div className="month">
                {format(currentDate, 'MMMM yyyy')}
            </div>
            <div className="weekdays">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}
            </div>
            <div className="days">
                {daysInMonth.map((day, index) => (
                    <div
                        key={index}
                        className={`day ${isToday(day) ? 'today' : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
            {selectedDay && <DayView day={selectedDay} />}
        </div>
    );
};

export default EventCalendarView;
