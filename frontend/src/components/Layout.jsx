import {useEffect} from 'react';
import {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const [isLogined, setIsLogined] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setIsLogined(userToken !== null);
    }, [isLogined]);

    async function handleLogout() {
        const userToken = localStorage.getItem('userToken');
        const out = 'Bearer ' + userToken;
        const logoutUrl = "api/logout";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': out,
            }

        };
        try {
            const response = await fetch(logoutUrl, requestOptions);
            const data = await response.json();

            if (!response.ok) {
                console.error(data);
            }

            localStorage.clear();
            setIsLogined(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <nav className="bg-gray-800 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            {!isLogined && (
                                <>
                                    <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                                    <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                </>
                            )}
                            {isLogined && (
                                <>
                                    <Link to="/createCalendar" className="text-white px-3 py-2 rounded-md text-sm font-medium">Create a new Calendar</Link>
                                    <Link to="/test" className="text-white px-3 py-2 rounded-md text-sm font-medium">All created Calendars</Link>
                                    <Link to="/profile" className="text-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                    <button onClick={handleLogout} className="text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <section>
                <Outlet />
            </section>
        </div>
    );
}

export default Layout;