import React, { useState, useContext } from 'react';
import Input from './input';
import { useHistory } from "react-router-dom"
import loginContext from "../Context"

function Signup() {
    let empty = {
        name: "",
        email: "",
        password: "",
        mobile: ""
    };

    const { setLoginStatus } = useContext(loginContext);
    const [signupInput, setSignupInput] = useState(empty);
    const [signupCheck, setSignupCheck] = useState();
    let history = useHistory();

    function setInput(event) {
        let { name, value } = event.target;
        setSignupInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function login(e) {

        fetch("/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signupInput.email,
                password: signupInput.password
            })
        }).then(() => setLoginStatus(true)
        )

    }

    function signup(e) {
        e.preventDefault();
        fetch("/create/user", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: signupInput.name,
                email: signupInput.email,
                password: signupInput.password,
                mobile: signupInput.mobile
            })
        }).then((data) => {
            if (data.status === 200) {
                login();
                history.go(-2);
            } else if (data.status === 403) {
                setSignupCheck("Email Id already Exist");
            } else {
                setSignupCheck("There was some error, Please Try again!");
            }
        })

    }

    return <div>
        <h2 className="text-center">SignUp Page!</h2>
        <form onSubmit={signup} >
            <div className="custom-container m-auto">
                <div><p className="text-danger  m-0">{signupCheck}</p></div>
                <div className="container-fluid">

                    <Input type="text" label="Name"
                        placeholder="Enter Your Name"
                        name="name" onChange={setInput}
                        value={signupInput.name} required />

                    <Input type="email" label="email"
                        placeholder="Enter Your Email"
                        name="email" onChange={setInput}
                        value={signupInput.email} required />

                    <Input type="password" label="Password"
                        placeholder="Enter Password Password"
                        name="password" onChange={setInput}
                        value={signupInput.password} required />

                    <Input type="number" label="Mobile"
                        placeholder="Enter Your Mobile Number"
                        name="mobile" onChange={setInput}
                        value={signupInput.mobile} required />

                    <button type="submit" className="btn btn-dark m-2" > Sign Up! </button>
                </div>
            </div>
        </form>

    </div>
};

export default Signup;