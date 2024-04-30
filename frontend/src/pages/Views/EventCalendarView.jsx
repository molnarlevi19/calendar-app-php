import {useState} from 'react';
import {format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths, getDay} from 'date-fns';
import DayView from "./DayView.jsx";

const EventCalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const lastDayOfMonth = endOfMonth(currentDate);
    const firstDayOfMonth = startOfMonth(currentDate);
    const firstDayOfWeek = getDay(firstDayOfMonth);
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const goToPreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const gridLayout = Array(7 * Math.ceil((firstDayOfWeek + daysInMonth.length) / 7)).fill(null);
    daysInMonth.forEach((day, index) => {
        gridLayout[firstDayOfWeek + index] = day;
    });

    return (
        <div className="container max-w-400px mx-auto text-center">
            <div className="month text-lg font-semibold mb-4">
                {format(currentDate, 'MMMM yyyy')}
            </div>
            <div className="flex justify-between mb-4">
                <button onClick={goToPreviousMonth} className="text-sm">
                    ≤ Previous
                </button>
                <button onClick={goToNextMonth} className="text-sm">
                    Next ≥
                </button>
            </div>
            <div className="weekdays grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="weekday font-semibold">
                        {day}
                    </div>
                ))}
            </div>
            <div className="days grid grid-cols-7 gap-2">
                {gridLayout.map((day, index) => (
                    <div
                        key={index}
                        className={`day border border-gray-300 rounded p-2 ${isToday(day) ? 'bg-blue-500 text-white' : ''} ${selectedDay && day && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'bg-green-500' : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day ? format(day, 'd') : ''}
                    </div>
                ))}
            </div>
            {selectedDay && <DayView day={selectedDay}/>}
        </div>
    );
};

export default EventCalendarView;