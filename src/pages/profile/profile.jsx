import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import './profile.css'

const Profile = () => {

    const {user} = useContext(AuthContext)
    return (
        <div className='profile-container'>
            <h2 className='welcome-user'>Welcome {user.username}!</h2>
            <section className="user-information-container">
                <span className="user-information"><p>username:</p><p>{user.username}</p></span>
                <span className="user-information"><p>email:</p><p>{user.email}</p></span>
            </section>

        </div>
    );
};

export default Profile;