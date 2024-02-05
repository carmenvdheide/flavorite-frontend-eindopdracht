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
    const [ ingredientsClassname, setIngrdientsClassname ] = useState('recipeDetailsIngredients')
    const [ allergensClassname, setAllergensClassname ] = useState('recipeDetailsDontDisplay')
    const [ nutrientsClassname, setNutrientsClassname ] = useState('recipeDetailsDontDisplay')

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

    function handleIngredientButton() {
        ingredientsClassname === "recipeDetailsDontDisplay" &&
            setIngrdientsClassname("recipeDetailsIngredients")
            setAllergensClassname("recipeDetailsDontDisplay")
        setNutrientsClassname('recipeDetailsDontDisplay')

    }

    function handleAllergenButton() {
        allergensClassname === "recipeDetailsDontDisplay" &&
            setAllergensClassname("recipeDetailsAllergens")
            setIngrdientsClassname("recipeDetailsDontDisplay")
            setNutrientsClassname('recipeDetailsDontDisplay')

    }

    function handleNutrientButton() {
        nutrientsClassname === "recipeDetailsDontDisplay" &&
            setNutrientsClassname('recipeDetailsNutrients')
            setIngrdientsClassname('recipeDetailsDontDisplay')
            setAllergensClassname("recipeDetailsDontDisplay")





    }

    const nutrientArray = recipeDetails.totalNutrients &&
        Object.values(recipeDetails.totalNutrients)



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


                </div>

            </section>
            <section className="recipeDetailsMiddle">
                <div className="recipeDetailsButtonWrap">
                    <button
                        className="recipeDetailsButton"
                        value="ingredients"
                        onClick={handleIngredientButton}
                    >Ingredients</button>
                    <button
                        className="recipeDetailsButton"
                        value="allergens"
                        onClick={handleAllergenButton}
                    >Allergens</button>
                    <button
                        className="recipeDetailsButton"
                        value="nutrients"
                        onClick={handleNutrientButton}
                    >Nutrients</button>
                    <button className="recipeDetailsButton">Directions</button>
                </div>
            </section>

            <section className="recipeDetailsBottom">
                <ul className={ingredientsClassname}>
                    { recipeDetails.ingredients && recipeDetails.ingredients.map((ingredient) =>{
                        return (
                                <li key={ingredient.food}>
                                    <img src={ingredient.image}/>
                                    <p>{ingredient.food}</p>
                                </li>
                            )

                    })}
                </ul>

                <ul>
                    {recipeDetails.healthLabels && recipeDetails.healthLabels.map((label) => {
                        return <li
                            key={label}
                            className={allergensClassname}
                        >{label}</li>
                    })}
                </ul>
                <uL>
                    {nutrientArray && nutrientArray.map((nutrient) => {
                        return (
                            <li
                                key={nutrient.label}
                                className={nutrientsClassname}>
                                <p>{nutrient.label}</p>
                                <p>{Math.round(nutrient.quantity)}{nutrient.unit}</p>
                            </li>)
                    })}
                </uL>



            </section>

        </article>

    )
}

export default RecipeDetails