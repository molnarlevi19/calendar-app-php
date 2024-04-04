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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        };

        fetch('http://127.0.0.1:8000/api/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                clearInputs();
                localStorage.setItem("userToken", data.token);
                localStorage.setItem("user_id", data.user_id);
                console.log('Token:', data.token);
                console.log('Token:', data.user_id);
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            })
            .catch(error => {
                console.error(error);
                clearInputs();
                setTimeout(() => {
                }, 2500);
            })
    }

    return (
        <form className="form-container" onSubmit={handleLogin}>
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to log in</p>
                <hr/>

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

export default Login