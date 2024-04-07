import React, {useState} from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
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
        <div className="container max-w-400px mx-auto text-center">
            <div className="month text-lg font-semibold mb-4">
                {format(currentDate, 'MMMM yyyy')}
            </div>
            <div className="weekdays grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="weekday font-semibold">
                        {day}
                    </div>
                ))}
            </div>
            <div className="days grid grid-cols-7 gap-2">
                {daysInMonth.map((day, index) => (
                    <div
                        key={index}
                        className={`day border border-gray-300 rounded p-2 ${isToday(day) ? 'bg-blue-500 text-white' : ''} ${selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'bg-green-500' : ''}`}
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
