import {useState} from "react";

const EditProfileModal = ({closeModal}) => {
    const userId = localStorage.getItem("user_id");
    const [modal, setModal] = useState(true);
    const [formData, setFormData] = useState({
        surname: "",
        lastname: "",
        birthdate: "",
        phone: "",
        location: ""
    });

    const toggleModal = () => {
        setModal(!modal);
        closeModal();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleUpdateProfile(e) {
        e.preventDefault();
        const updateUrl = `api/profile/${userId}`;

        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        };

        try {
            const response = await fetch(updateUrl, requestOptions);

            if (!response.ok){
                console.log("nem siker");
            }

            console.log("siker");
            closeModal();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg ${modal ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Profile</h2>
                    <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleUpdateProfile}>
                    <div className="mb-4">
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                        Surname
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                            Lastname
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                            Birthdate
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;


/*
* <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-8 rounded shadow">
                                <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                            Surname
                                        </label>
                                        <input
                                            type="text"
                                            id="surname"
                                            name="surname"
                                            value={formData.surname}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                            Lastname
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            value={formData.lastname}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                            Birthday
                                        </label>
                                        <input
                                            type="text"
                                            id="birthday"
                                            name="birthday"
                                            value={formData.birthday}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                            Phone number
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/