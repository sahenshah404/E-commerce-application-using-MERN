import React, { createContext, useEffect,useState } from 'react';

const LoginContext = createContext();
const Provider = LoginContext.Provider;

function Context(props) {
    const [loginStatus, setLoginStatus] = useState(undefined);

    useEffect(()=>{
        (async()=>{
            let res = await fetch("/login/status");
            let loginCheck = await res.json();
            setLoginStatus(loginCheck);   

        })()
    },[])


    return <Provider value={{loginStatus,setLoginStatus}}>
        {props.children}
    </Provider>
};

export default LoginContext;
export {Context};

