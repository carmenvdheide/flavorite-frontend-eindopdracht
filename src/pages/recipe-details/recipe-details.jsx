import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import './recipe-details.css'
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";

function RecipeDetails() {
    const { id } = useParams()
    const [ recipeDetails, setRecipeDetails ] = useState([])


    async function fetchRecipeDetails() {
        try {
            const result = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public`)
            console.log("result:",result.data.recipe)

            setRecipeDetails(
                result.data.recipe
            )
        } catch (e) {
            console.error(e)
            console.log('nope')
        }
    }

    useEffect(() => {
        void fetchRecipeDetails()
    }, [])




    return (
        <article className="recipeDetailsContainer">
            <section className='recipeDetailsTop'>
                    <img
                        src={recipeDetails.image}
                        className="detailPageImg"
                    />
                <div className="recipeDetailsInfo">
                    <h2>{recipeDetails.label}</h2>
                    <span className="iconNumberWrapper">
                        <FontAwesomeIcon className="iconDetailPage" icon={faClock} size={"2xl"}/>
                        <div>
                            <p>{recipeDetails.totalTime}</p>
                            <p>min</p>
                        </div>
                        <FontAwesomeIcon className="iconDetailPage" icon={faFireFlameCurved} size={"2xl"}/>
                        <div>
                            <p>{Math.round(recipeDetails.calories)}</p>
                            <p>kCal</p>
                        </div>
                    </span>
                    <div className="recipeDetailsTags">
                        {recipeDetails.dietLabels && recipeDetails.dietLabels.map((label) => {return <p key={label}>{label}</p>})}
                        {recipeDetails.cuisineType && recipeDetails.cuisineType.map((type) => {return <p key={type}>{type}</p>})}
                        {recipeDetails.mealType && recipeDetails.mealType.map((type) => {return <p key={type}>{type}</p>})}
                        {recipeDetails.dishType && recipeDetails.dishType.map((type) => {return <p key={type}>{type}</p> })}
                    </div>

                    {/*<ul>*/}
                    {/*    {recipeDetails.healthLabels.map((label) => {*/}
                    {/*        return <li key={label}>{label}</li>*/}
                    {/*    })}*/}
                    {/*</ul>*/}

                </div>

            </section>
            <section className="recipeDetailsMiddle">
                <div className="recipeDetailsButtonWrap">
                    <button className="recipeDetailsButton">Ingredients</button>
                    <button className="recipeDetailsButton">Allergens</button>
                    <button className="recipeDetailsButton">Nutrients</button>
                    <button className="recipeDetailsButton">Directions</button>
                </div>
            </section>

        </article>

    )
}

export default RecipeDetails