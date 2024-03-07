import React, {useContext} from "react"
import logo from "../../assets/flavorite-logo.png";
import { NavLink } from "react-router-dom";
import './Navigation.css'
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function Navigation () {

    const { isAuth } = useContext(AuthContext)
    const { logout } = useContext(AuthContext)


    return (
        <nav className="navBar">
            <img src={logo}/>
            <ul>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}
                        to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}
                        to="/recipes">Recipes</NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}
                        to="/random">Random</NavLink>
                </li>
            </ul>

            {isAuth
                ? <div className='logged-in-navbar end-navbar'>
                    <li>
                        <NavLink
                            className="accountNav"
                            to="/profile">profile</NavLink>
                    </li>
                    <li>
                        <button className='accountNav'
                                onClick={logout}><FontAwesomeIcon
                                icon={faArrowRightFromBracket}
                                className='logout-icon'/>
                        </button>
                    </li>
                </div>
            : <ul className="end-navbar">
                    <li className="accountNav end-navbar login-button">
                        <NavLink
                            className="accountNav"
                            to="/login">Login</NavLink>
                    </li>
                </ul>}

        </nav>
    )
}

export default Navigation