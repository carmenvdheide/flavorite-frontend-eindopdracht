import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import './profile.css'

const Profile = () => {

    const recipeString = localStorage.getItem('favorite')
    const recipe = JSON.parse(recipeString)


    const {user} = useContext(AuthContext)
    return (
        <div className='profile-container'>
            <h2 className='welcome-user'>Welcome {user.username}!</h2>
            <section className="user-information-container">
                <div className="user-data">
                    <span className="user-information"><p>username:</p><p>{user.username}</p></span>
                    <span className="user-information"><p>email:</p><p>{user.email}</p></span>
                </div>
                <button className='profile-button'>change info</button>
            </section>
            <section>
                <ul>
                {recipe && recipe.map((recipe) => {
                    return <li key={recipe.label}>{recipe.label}</li>
                })}
                </ul>

            </section>

        </div>
    );
};

export default Profile;