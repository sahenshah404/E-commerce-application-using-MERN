import React, { useState,useContext } from 'react';
import Input from './input';
import {useHistory} from "react-router-dom"
import loginContext from "../Context"

function Login() {
    let empty = {
        email: "",
        password: ""
    };

    const { setLoginStatus } = useContext(loginContext);
    const [loginInput, setLoginInput] = useState(empty);
    const [loginCheck, setLoginCheck] = useState();
    let history =useHistory();

    function setInput(event) {
        let { name, value } = event.target;
        setLoginInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function login(e) {
        e.preventDefault();
        fetch("/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: loginInput.email,
                password: loginInput.password
            })
        }).then((data)=>{
    if (data.status!==200) {
        setLoginCheck("Wrong Email/Password");
    }else{
setLoginStatus(true);
history.push("/home");
    }
        })

    }

    return <div>
        <form onSubmit={login} >
            <div className="input-form m-auto">
            <div><p className="text-danger  m-0">{loginCheck}</p></div>
                <div className="container-fluid">
                    <Input type="email" label="Name"
                        placeholder="Enter Email here"
                        name="email" onChange={setInput}
                        value={loginInput.email} required />

                    <Input type="password" label="Password"
                        placeholder="Enter Password here"
                        name="password" onChange={setInput}
                        value={loginInput.password} required />

                    <button type="submit" className="btn btn-dark m-2" > Login</button>
                </div>
            </div>
        </form>





    </div>
};

export default Login;