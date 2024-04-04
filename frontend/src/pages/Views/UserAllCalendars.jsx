import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const UserAllCalendars = () => {
    const [calendars, setCalendars] = useState([]);

    useEffect(() => {
        allCalendars();
    }, []);

    const allCalendars = () => {
        const token = localStorage.getItem('userToken');

        fetch('http://127.0.0.1:8000/api/allCalendars', {
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
        <div>
            <h2>Calendar Names:</h2>
            <ul>
                {calendars.map(calendar => (
                    <li key={calendar.calendar_id}>
                        <Link to={`/calendar/${calendar.calendar_id}`}>
                            {calendar.calendar_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserAllCalendars;