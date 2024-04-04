import {useState} from "react";

const CalendarCreator = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmitCalendar = () => {
        const userId= localStorage.getItem("user_id");

        fetch('http://127.0.0.1:8000/api/storeCalendar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                calendar_name: name,
                calendar_description: description,
                user_id: userId
            })
        }).then(r => r.json())
            .then(data => {
                console.log(data);

            })
            .catch(e => {
                console.error('Error:', e);

            })
     }

    return (
        <div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Calendar Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Calendar Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleSubmitCalendar}>Submit Calendar</button>
            </div>
        </div>
    )
}

export default CalendarCreator