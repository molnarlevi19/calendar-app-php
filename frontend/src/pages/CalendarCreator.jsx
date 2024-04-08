import {useState} from "react";

const CalendarCreator = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmitCalendar = () => {
        const createCalendarUrl = '/api/storeCalendar';
        const userId= localStorage.getItem("user_id");
        const token= localStorage.getItem("userToken");

        fetch(createCalendarUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                calendar_name: name,
                calendar_description: description,
                user_id: userId
            }),
        }).then(r => r.json())
            .then(data => {
                console.log(data);

            })
            .catch(e => {
                console.error('Error:', e);

            });
     }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmitCalendar}>
                <h1 className="text-2xl font-bold mb-4">Create Calendar</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calendarName">
                        Calendar Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="calendarName"
                        type="text"
                        placeholder="Calendar Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="calendarDescription">
                        Calendar Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="calendarDescription"
                        type="text"
                        placeholder="Calendar Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CalendarCreator;