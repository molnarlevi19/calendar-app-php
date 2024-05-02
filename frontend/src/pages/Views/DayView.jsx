import {useState} from "react";
import {useParams} from "react-router-dom";

const DayView = ({ day }) => {
    const { id } = useParams();

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTimeClick = (hour) => {
        if (!startTime) {
            setStartTime(hour);
        } else if (!endTime && hour > startTime) {
            setEndTime(hour);
        } else {
            setStartTime(hour);
            setEndTime(null);
        }
    };

    async function handleSubmitEvent() {
        const token = localStorage.getItem('userToken');

        if (startTime !== null && endTime !== null && title.trim() !== "" && description.trim() !== "") {
            const nextDay = new Date(day);
            nextDay.setDate(nextDay.getDate() + 1);

            const startDate = `${nextDay.toISOString().split('T')[0]}T${startTime}:00`;
            const endDate = `${nextDay.toISOString().split('T')[0]}T${endTime}:00`;

            const createEventUrl = '/api/storeEvent';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    event_title: title,
                    event_description: description,
                    start_date: startDate,
                    end_date: endDate,
                    calendar_id: id
                }),
            }

            try {

                const response = await fetch(createEventUrl, requestOptions);
                const data = await response.json();

                if(!response.ok) {
                    console.error(data.error);
                }

                alert("Created event successfully");
            } catch (error) {

                console.error('Error:', error.message);
            }
        }
    }


    const renderHours = () => {
        const hoursInADay = 24;
        let hours = [];

        for (let i = 0; i < hoursInADay; i++) {
            hours.push(
                <div
                    key={i}
                    className={`hour cursor-pointer p-2 border border-gray-200 ${i === startTime ? 'bg-green-300' : ''} ${i > startTime && i < endTime ? 'bg-green-300' : ''} ${i === endTime ? 'bg-green-300' : ''}`}
                    onClick={() => handleTimeClick(i)}
                >
                    {`${i < 10 ? '0' + i : i}:00`}
                </div>
            );
        }
        return hours;
    };

    return (
        <div className="day-view">
            <h2>{day.toDateString()}</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mt-2 resize-none text-sm"
                />
            </div>
            <div className="hour-container">
                {renderHours()}
            </div>
            <div className="selected-times">
                {startTime !== null && (
                    <div>
                        Start Time: {`${startTime < 10 ? '0' + startTime : startTime}:00`}
                    </div>
                )}
                {endTime !== null && (
                    <div>
                        End Time: {`${endTime < 10 ? '0' + endTime : endTime}:00`}
                    </div>
                )}
                {(startTime !== null && endTime !== null && title.trim() !== "" && description.trim() !== "") && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSubmitEvent}
                    >
                        Submit Event
                    </button>
                )}
            </div>
        </div>
    );
}

export default DayView