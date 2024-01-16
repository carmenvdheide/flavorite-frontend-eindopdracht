import axios from "axios";
import {useEffect, useState} from "react";
import './all-recipes.css'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";

function AllRecipes() {


    const [ data, setData ] = useState([])

    async function fetchRecipes() {
        try {
            const result = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public', { params: {
                    mealType: 'Dinner',
                    dishType: 'Main course',
                    random: true,
                }})
            console.log("result hits:",result.data.hits)
            setData(
                result.data.hits
            )
        } catch (e) {
            console.error(e)
            console.log('nope')
        }
    }

    useEffect(() => {
        void fetchRecipes()
    }, [])


    return (

        <>
            <p>RECIPES</p>

            <section className="allRecipesContainer">
                <ul className="allRecipesList">
                    {data.map((recipe) => (
                        <NavLink
                            to="/"
                            key={recipe.recipe.uri.split('_')[1]}
                            className="recipe-link">
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
                                    <FontAwesomeIcon className="iconAllRecipePage" icon={faFireFlameCurved} size={"2xl"} />
                                    <p>{Math.round(recipe.recipe.calories)}kCal</p>
                                </div>
                            </section>


                            <ul className='recipePageAllergens'>
                                {recipe.recipe.healthLabels.map((allergen) => (
                                    <li key={recipe.recipe.uri.split('_')[1]}>{allergen}</li>
                                ))}
                            </ul>
                        </li>
                        </NavLink>
                    ))}
                </ul>
            </section>



        </>
    )
}

export default AllRecipes