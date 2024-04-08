import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function clearInputs() {
        setEmail('')
        setPassword('')
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const LoginUrl = '/api/login';

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        };

        fetch(LoginUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                clearInputs();
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("user_id", data.user_id);
                console.log('Token:', data.token);
                console.log('Token:', data.user_id);
                navigate('/');
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                clearInputs();

            });
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <p className="mb-4">Please fill in this form to log in</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;