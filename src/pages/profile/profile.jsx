import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import './profile.css'
import {FavoriteRecipeContext} from "../../context/FavoriteRecipesProvider.jsx";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NavLink} from "react-router-dom";

const Profile = () => {

    const recipeString = localStorage.getItem('favorite')
    const recipe = JSON.parse(recipeString)


    const {user} = useContext(AuthContext)

    const {deleteFavoriteRecipe} = useContext(FavoriteRecipeContext)

    const id = recipe[0].uri.split('_')[1]

    function handleClick() {
        console.log(id)
    }

    return (
        <div className='profile-container'>
            <h2 className='welcome-user'>Welcome {user.username}!</h2>
            <section className="user-information-container">
                <div className="user-data">
                    <span className="user-information"><p>username:</p><p>{user.username}</p></span>
                    <span className="user-information"><p>email:</p><p>{user.email}</p></span>
                </div>
                <button className='profile-button' onClick={handleClick}>change info</button>
            </section>
            <section className='favorite-section'>
                <h3>Favorite recipes ({recipe.length})</h3>
                <ul className="favorite-list">
                {recipe && recipe.map((recipe) => {
                    return (
                        <li key={recipe.label}
                            className="favorite-list-item">
                            {/*TO DO: when the user clicks on the back buttonon the detail-page, it goes back to the page with all recipes instead of the profile page*/}
                            <NavLink
                                to={`/recipes/${recipe.uri.split('_')[1]}`}>
                            <img src={recipe.image} alt="favorite recipe img"/>
                            <div>
                                <p>{recipe.label}</p>
                            </div>
                            </NavLink>
                            <button onClick={() => deleteFavoriteRecipe(recipe.label)}>
                                <FontAwesomeIcon
                                    className='icon-delete-favorite'
                                    icon={faTrashCan} />
                            </button>

                        </li>
                    )
                })}
                </ul>

            </section>

        </div>
    );
};

export default Profile;