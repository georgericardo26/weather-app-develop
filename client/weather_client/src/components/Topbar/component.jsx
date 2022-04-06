import React from 'react';

export default function Topbar(){

    return (
        <nav className="navbar navbar-expand-sm topbar">
            <div className="container">
                <a className="navbar-brand brand" href="/">Loadsmart Weather</a>
                
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/history">History</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                </ul>

            </div>
        </nav>
    )
}