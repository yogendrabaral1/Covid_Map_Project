import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h4>COVID-19 Tracker</h4>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" style={{ position: "absolute", right: 10 }}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Global <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/USA">USA <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tableview">Table View</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;