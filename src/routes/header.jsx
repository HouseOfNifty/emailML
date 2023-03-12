import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import "./header.css"

import { useState } from 'react'

import Login from './login/login';

export default function Header() {

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    return (
        <div>

            <div className='headerBox'>
                <h1>Company Name</h1>
                <div className='linksBox'>
                    <Link to="/">Home</Link>
                    <Link to="about">About</Link>
                    <Link to="demo">Demo</Link>
                    {user ? <><Link to="dashboard">Dashboard</Link><button onClick={() => {signOut(auth)}}>Sign Out</button></> : <><Link to="register">Register</Link><Login/></>}
                </div>
            </div>
            <Outlet />
        </div>
    );
};