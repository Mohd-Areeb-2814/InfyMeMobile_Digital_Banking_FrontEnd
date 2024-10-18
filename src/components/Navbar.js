import React from 'react'

import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
 
const Navbar = () => {
    const navigate = useNavigate();
    const logOut=()=>{
      localStorage.clear();
      navigate("/");
    }
    const getBooleanFromLocalStorage = (key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : false; // Default to false if not found
    };
    return (
      <div className='respo'>
        <nav class="navbar navbar-expand-lg navbar-light bg-light ms-4">
        <Link class="navbar-brand" to="/">InfyMeMobile</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
       {getBooleanFromLocalStorage('isUserLoggedIn') === true ? (<>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/accounts">List Account</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/create">Create Account</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/link">Link Account</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/linkotp">Link Account with OTP</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/transfer">Fund Transfer</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/statement">Account Statement</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link " to="/balance">Check Balance</Link>
            </li>
            <li class="nav-item">
            <button className="nav-link" type="btn" onClick={logOut}>
                  Logout
            </button>
            </li>
          </ul>
        </div>
       </>) : null}
      </nav></div>
      );
    };
   
 
export default Navbar