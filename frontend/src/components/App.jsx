import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./Body/Body";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";




function App() {
    return <Router >
        <Header />
        <Body />
        <Footer />
    </Router>
};

export default App; 