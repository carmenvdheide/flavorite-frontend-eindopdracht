import logo from "../../assets/flavorite-logo.png";
import { NavLink } from "react-router-dom";
import './Navigation.css'
function Navigation () {
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
            <ul>
                <li className="accountNav">
                    <NavLink
                        className="accountNav"
                        to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation