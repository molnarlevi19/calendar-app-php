import {useEffect, useState} from 'react';
import {addMonths, eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, subMonths} from 'date-fns';
import DayView from "./DayView.jsx";
import {useParams} from "react-router-dom";

const EventCalendarView = () => {
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const lastDayOfMonth = endOfMonth(currentDate);
    const firstDayOfMonth = startOfMonth(currentDate);
    const firstDayOfWeek = getDay(firstDayOfMonth);
    const [allEvents, setAllEvents] = useState(null);
    const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    useEffect(() => {
        getAllEvents();
    }, [currentDate]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    async function getAllEvents() {
        const profileUrl = `/api/calendar/${id}`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        try {
            const response = await fetch(profileUrl, requestOptions);
            const data = await response.json();

            if(!response.ok) {
                console.error(data.error);
            }

            setAllEvents(data);
        } catch (error) {

            console.error(error);
        }
    }

    const goToPreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const hasEvents = (day) => {
        if (!allEvents || !day) return false;
        const formattedDay = format(day, 'yyyy-MM-dd');
        return allEvents.some(event => event.start_date && format(new Date(event.start_date), 'yyyy-MM-dd') === formattedDay);
    };

    const getDayBackgroundColor = (day) => {
        if (!day) return '';
        if (isToday(day)) return 'bg-blue-500 text-white';
        if (selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')) return 'bg-green-500';
        return hasEvents(day) ? 'bg-purple-500' : '';
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
                        className={`day border border-gray-300 rounded p-2 ${getDayBackgroundColor(day)}`}
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