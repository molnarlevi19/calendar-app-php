import {useEffect, useState} from "react";
import EditProfileModal from "../components/modals/EditProfileModal.jsx";

const UserProfile = () => {
    const userId = localStorage.getItem("user_id");
    const userToken = localStorage.getItem("userToken");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleFetchProfile();
        getProfileImage();
    }, []);

    async function handleFetchProfile() {
        const profileUrl = `api/profile/${userId}`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        try {
            const response = await fetch(profileUrl, requestOptions);
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    }

    async function getProfileImage() {
        const updateUrl = `api/images/${userId}`;

        try {
            const response = await fetch(updateUrl);
            const data = await response.blob();
            const imageURL = URL.createObjectURL(data);
            setImage(imageURL);
        } catch (error) {
            console.error('Error fetching image: ', error);
        }
    }

    async function submitImage(file) {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', file);

        const updateUrl = `api/createImage`;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
            body: formData,
        };

        try {
            await fetch(updateUrl, requestOptions);
            await getProfileImage();
        } catch (error) {
            console.error('Error creating image:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        submitImage(file);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="image"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    >
                        Edit Profile Picture
                    </label>
                </div>
            </div>
            <div>
                <img src={image} alt="Profile image" className="h-32 w-32 object-cover rounded-full"/>
            </div>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {data.username}&#39;s Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Surname
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.surname ? data.surname : "Not set"}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Lastname
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.lastname ? data.lastname : "Not set"}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Birthdate
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.birthdate ? data.birthdate : "Not set"}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.location ? data.location : "Not set"}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Gender
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.UserGender ? data.UserGender : "Not set"}
                    </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                        Phone number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.phone ? data.phone : "Not set"}
                    </dd>
                </div>
            </dl>
            {showModal && (
                <EditProfileModal
                    closeModal={() => setShowModal(false)}
                />
            )}
        </>
    );
}

export default UserProfile;