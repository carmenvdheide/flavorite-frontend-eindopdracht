import React, {useContext, useEffect, useState} from "react"
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './recipe-details.css'
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faAnglesLeft, faStar} from "@fortawesome/free-solid-svg-icons";

import {FavoriteRecipeContext} from "../../context/FavoriteRecipesProvider.jsx";


function RecipeDetails({backButton, backButtonText}) {
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

    const dailyNutrientArray = recipeDetails.totalDaily &&
        Object.values(recipeDetails.totalDaily)

    const navigate = useNavigate()

    function handleDirectionsLink() {
        window.open(recipeDetails.url)
    }


    const [ favoriteState, setFavoriteState ] = useState({
        clicked: false,
        classname: 'favorite-icon'
    })

    const { setFavoritesArray } = useContext(FavoriteRecipeContext)

    const {deleteFavoriteRecipe} = useContext(FavoriteRecipeContext)



    const handleButtonClick = () => {
        const updatedClickedState = !favoriteState.clicked
        setFavoriteState({
            clicked: updatedClickedState,
            classname: updatedClickedState ? 'favorite-icon-clicked' : 'favorite-icon'
        })
        if (updatedClickedState) {
            setFavoritesArray(recipeDetails)
        } else {
            deleteFavoriteRecipe(recipeDetails.label)
        }
    }


    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorite')
        if (storedFavorites) {
            const recipeArray = JSON.parse(storedFavorites)
            const isRecipeAlreadyAdded = recipeArray.some(existingRecipe => existingRecipe.label === recipeDetails.label)
            setFavoriteState({
                clicked: isRecipeAlreadyAdded,
                classname: isRecipeAlreadyAdded ? 'favorite-icon-clicked' : 'favorite-icon'
            })
        }
    }, [recipeDetails])


    return (
        <article className="recipeDetailsContainer">

            <div>
                <button
                    className="recipeDetailsButtonTop"
                    onClick={() => navigate(backButton)}>
                    <FontAwesomeIcon className="backIcon" icon={faAnglesLeft} /><p>{backButtonText}</p>
                </button>
                <button className='favorite-button'
                        onClick={handleButtonClick}><FontAwesomeIcon icon={faStar} className={favoriteState.classname}/></button>

            </div>

            <section className='recipeDetailsTop'>
                    <img
                        src={recipeDetails.image}
                        className="detailPageImg"
                    />
                <div className="recipeDetailsInfo">
                    <h2>{recipeDetails.label}</h2>
                    <span className="iconNumberWrapper">
                        <FontAwesomeIcon className="iconDetailPage" icon={faClock}/>
                        <div>
                            <p>{recipeDetails.totalTime}</p>
                            <p>min</p>
                        </div>
                        <FontAwesomeIcon className="iconDetailPage" icon={faFireFlameCurved} />
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
                    >Health labels</button>
                    <button
                        className="recipeDetailsButton"
                        value="nutrients"
                        onClick={handleNutrientButton}
                    >Nutrients</button>
                    <button
                        className="recipeDetailsButton"
                        onClick={handleDirectionsLink}
                    >Directions</button>
                </div>
            </section>

            <section className="recipeDetailsBottom">
                <ul className={ingredientsClassname}>
                    { recipeDetails.ingredients && recipeDetails.ingredients.map((ingredient) =>{
                        return (
                                <li key={ingredient.food}>
                                    <img src={ingredient.image}/>
                                    <p>{ingredient.food}</p>
                                    <p className="ingredientAmount">
                                        {ingredient.quantity !== 0
                                            ? Number.isInteger(ingredient.quantity)
                                                ? ingredient.quantity
                                                : /^\d+\.\d$/.test(ingredient.quantity)
                                                    ? ingredient.quantity.toFixed(1)
                                                : ingredient.quantity.toFixed(2)
                                            : ""}
                                        {ingredient.measure === "<unit>" || ingredient.measure === null
                                            ? ""
                                            : ingredient.quantity > 1
                                                ? ` ${ingredient.measure}s`
                                                : ` ${ingredient.measure}`}</p>
                                </li>
                            )

                    })}
                </ul>

                <ul className={allergensClassname}>
                    {recipeDetails.healthLabels && recipeDetails.healthLabels.map((label) => {
                        return (
                                <li
                                    key={label}
                                    className="recipeDetailsAllergenList">
                                    <p>{label}</p>
                                </li>
                            )

                    })}
                </ul>

                <uL className={nutrientsClassname}>
                    <li>
                        <p className="description descriptionNutrient">Nutrient</p>
                        <p className="description descriptionQuantity">Quantity</p>
                        <p className="description descriptionDaily">% of daily requirements</p>
                    </li>
                    {nutrientArray && nutrientArray.map((nutrient) => {
                        return (
                            <li
                                key={nutrient.label}
                                >
                                <p className="nutrientLabel">{nutrient.label}</p>
                                <p className="nutrientQuantity">{Math.round(nutrient.quantity)}{nutrient.unit}</p>
                                <p className="dailyNutrient">{dailyNutrientArray.map((dailyNutrient) => {
                                    return (
                                        dailyNutrient.label === nutrient.label
                                            ? <p>{Math.round(dailyNutrient.quantity)}{dailyNutrient.unit}</p>
                                            : ""
                                    )})}
                                </p>
                            </li>)
                    })}
                </uL>

            </section>

        </article>

    )
}

export default RecipeDetails