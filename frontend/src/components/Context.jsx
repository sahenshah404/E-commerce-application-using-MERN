import React, { createContext, useEffect,useState } from 'react';

const LoginContext = createContext();
const Provider = LoginContext.Provider;

function Context(props) {
    const [loginStatus, setLoginStatus] = useState(undefined);
    const [cart,setCart]= useState([]);

    useEffect(()=>{
        (async()=>{
            let res = await fetch("/login/status");
            let loginCheck = await res.json();
            setLoginStatus(loginCheck);   

        })()
    },[]);

    function setCartItem(item) {
        setCart((prev)=>{
            return [
                ...prev,item
            ]
        })
    }


    return <Provider value={{loginStatus,setLoginStatus,setCartItem,cart,setCart}}>
        {props.children}
    </Provider>
};

export default LoginContext;
export {Context};

