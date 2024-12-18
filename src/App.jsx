import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Breadcrumbs from "./components/Breadcrumbs";
import Code from "./pages/Code";
import Link from "./pages/Link";
import Home from "./pages/Home";
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="main-container">
                    <Sidebar />
                    <div className="content-area">
                        <Breadcrumbs /> {/* 面包屑组件 */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/code" element={<Code />} />
                            <Route path="/link" element={<Link />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
