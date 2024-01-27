import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import HandleAllergens from "../allergens/handleAllergens.jsx";

function RecipeCard({recipe}) {


    return (


        // <NavLink
        //     to="/recipes/${recipe.recipe.uri.split('_')[1]}"
        //     className="recipe-link">
            <li
                className="recipeCard">
                <img
                className="recipePageImage"
                src={recipe.recipe.image}/>
                <h3 className="recipePageName">{recipe.recipe.label}</h3>
                <section className="recipeCardInfo">
                    <div>
                        <FontAwesomeIcon className="iconAllRecipePage" icon={faClock} size={"2xl"}/>
                        <p>{recipe.recipe.totalTime}min</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="iconAllRecipePage" icon={faFireFlameCurved} size={"2xl"}/>
                        <p>{Math.round(recipe.recipe.calories)}kCal</p>
                    </div>
                </section>


                <ul className='recipePageAllergens'>
                    {recipe.recipe.healthLabels.map((allergen) => (
                        <li key={recipe.recipe.uri.split('_')[1]}>{allergen}</li>
                    ))}
                </ul>
                <div className="allergenList">


                    {HandleAllergens(recipe)}
                </div>


            </li>
        // </NavLink>

    )
}

export default RecipeCard