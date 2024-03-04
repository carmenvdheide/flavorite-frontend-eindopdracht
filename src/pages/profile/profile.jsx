import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import './profile.css'
import {FavoriteRecipeContext} from "../../context/FavoriteRecipesProvider.jsx";

const Profile = () => {

    const recipeString = localStorage.getItem('favorite')
    const recipe = JSON.parse(recipeString)


    const {user} = useContext(AuthContext)

    const {deleteFavoriteRecipe} = useContext(FavoriteRecipeContext)
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
            <section className='favorite-section'>
                <h3>Favorite recipes ({recipe.length})</h3>
                <ul className="favorite-list">
                {recipe && recipe.map((recipe) => {
                    return (
                        <li key={recipe.label}
                            className="favorite-list-item">
                            <img src={recipe.image} alt="favorite recipe img"/>
                            <div>
                                <p>{recipe.label}</p>
                            </div>
                            <button onClick={() => deleteFavoriteRecipe(recipe.label)}>delete</button>

                        </li>
                    )
                })}
                </ul>

            </section>

        </div>
    );
};

export default Profile;