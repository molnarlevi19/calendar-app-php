import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();
    const [isLogined,setIsLogined] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function clearInputs() {
        setUsername('')
        setEmail('')
        setPassword('')
    }

    useEffect(() =>{
        setIsLogined( localStorage.getItem('userToken') !== null);
        if(isLogined){
            navigate("/")
        }
    },[isLogined])

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, email: email })
        };

        fetch('http://127.0.0.1:8000/api/register', requestOptions)
            .then(response => response.json())
            .then(data => {
                clearInputs();
                setData(data)
                setTimeout(() => {
                    console.log('hi')
                }, 2500);
            })
            .catch(error => {
                clearInputs();
                console.error(error);
                setTimeout(() => {
                    console.log('hi')
                }, 2500);
            })

    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <p className="mb-4">Please fill in this form to create an account.</p>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                    />
                </div>
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                        Register
                    </button>
                </div>
                <hr className="my-4" />
                <p className="text-sm">By creating an account you agree to our <a href="#" className="text-blue-500">Terms & Privacy</a>.</p>
                <div className="text-sm mt-4">
                    <p>Already have an account? <a href="/login" className="text-blue-500">Sign in</a>.</p>
                </div>
            </form>
        </div>
    );
}

export default Register;