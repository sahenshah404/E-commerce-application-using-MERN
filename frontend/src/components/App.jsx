import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./Body/Body";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {Context} from "./Context";




function App() {
    return <Context>
        <Router >
            <Header />
            <Body />
            <Footer />
        </Router>
    </Context>
};

export default App;