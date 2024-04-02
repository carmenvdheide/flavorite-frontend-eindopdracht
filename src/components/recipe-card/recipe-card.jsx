import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import HandleAllergens from "../allergens/handleAllergens.jsx";
import {NavLink} from "react-router-dom";

import './recipe-card.css'

function RecipeCard({recipe, classname, classnameText, classnameAllergens, classnameNavLink, navlink, classnameIcons}) {

    const recipeID = recipe.recipe.uri.split('_')[1]

    return (
    <div className={classname}>

        <NavLink
            to={`/${navlink}/${recipeID}`}
            className={classnameNavLink}>

                <img
                    className="recipe-page-image"
                    src={recipe.recipe.image}/>

                <div className={classnameText}>
                    <h3 className="recipe-page-name">{recipe.recipe.label}</h3>

                    <section className={classnameIcons}>
                        <div>
                            <FontAwesomeIcon className="icon-all-recipe-page" icon={faClock} size={"2xl"}/>
                            <p>{recipe.recipe.totalTime}min</p>
                        </div>
                        <div>
                            <FontAwesomeIcon className="icon-all-recipe-page" icon={faFireFlameCurved} size={"2xl"}/>
                            <p>{Math.round(recipe.recipe.calories)}kCal</p>
                        </div>
                    </section>
                </div>

        </NavLink>

                <div className={classnameAllergens}>
                    <HandleAllergens
                        data={recipe}
                    />
                </div>





    </div>


    )
}

export default RecipeCard