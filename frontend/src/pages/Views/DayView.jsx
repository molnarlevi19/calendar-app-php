import {useState} from "react";
import {useParams} from "react-router-dom";

const DayView = ({ day }) => {
    const { id } = useParams();

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [title, setTitle] = useState("");
    const [description ,setDescription] = useState("");

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

    const handleSubmitEvent = () => {
        if (startTime !== null && endTime !== null && title.trim() !== "" && description.trim() !== "") {
            const startDate = `${day.toISOString().split('T')[0]}T${startTime}:00`;
            const endDate = `${day.toISOString().split('T')[0]}T${endTime}:00`;

            fetch('http://127.0.0.1:8000/api/storeEvent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_title: title,
                    event_description: description,
                    start_date: startDate,
                    end_date: endDate,
                    calendar_id: id
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                })
                .catch(error => {
                    console.error('Error:', error);

                });
        }
    };

    const renderHours = () => {
        let hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(
                <div
                    key={i}
                    className={`hour ${i === startTime ? 'start-time' : ''} ${i > startTime && i < endTime ? 'selected' : ''} ${i === endTime ? 'end-time' : ''}`}
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
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    <button onClick={handleSubmitEvent}>Submit Event</button>
                )}
            </div>
        </div>
    );
}

export default DayView