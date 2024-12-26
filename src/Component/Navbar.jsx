import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Spinner from "./Spiner";


export default function Navbar() {
    return (
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary"
                data-bs-theme="dark"
            >
                <div className="container-fluid">
                    <a className="navbar-brand display-4 font-monospace" href="#">
                        BlogSpace
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/explore">
                                    Explore
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/animation">
                                    Spin
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav gap-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="btn btn-outline-success"
                                    aria-current="page"
                                    to="/login"
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="btn btn-outline-success"
                                    aria-current="page"
                                    to="/signup"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
      

    );
}
