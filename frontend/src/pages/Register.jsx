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

    return(
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>

                <label form="email"><b>Email</b></label>
                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"/>

                <label form="psw"><b>Password</b></label>
                <input
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label form="psw-repeat"><b>Repeat Password</b></label>
                <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <hr/>
                <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                <button type="submit" className="registerbtn">Register</button>
            </div>

            <div className="container signin">
                <p>Already have an account? <a href="#">Sign in</a>.</p>
            </div>
        </form>
    )
}

export default Register;