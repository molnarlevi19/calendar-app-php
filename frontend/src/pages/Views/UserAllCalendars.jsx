import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const UserAllCalendars = () => {
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        allCalendars();
    }, []);

    const allCalendars = () => {
        const allCalendarsUrl = '/api/allCalendars';
        const token = localStorage.getItem('userToken');

        fetch(allCalendarsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const calendarsArray = Object.entries(data).map(([id, name]) => ({ calendar_id: id, calendar_name: name }));
                setCalendars(calendarsArray);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold mb-4">Your Calendars</h1>
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Calendar Names:</h2>
                    <ul>
                        {calendars.map((calendar) => (
                            <li key={calendar.calendar_id} className="mb-2">
                                <Link to={`/calendar/${calendar.calendar_id}`} className="text-blue-500 hover:underline">
                                    {calendar.calendar_name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserAllCalendars;