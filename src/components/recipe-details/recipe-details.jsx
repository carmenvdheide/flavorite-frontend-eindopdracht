import React, {useContext, useEffect, useState} from "react"
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './recipe-details.css'
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faAnglesLeft, faStar} from "@fortawesome/free-solid-svg-icons";

import {FavoriteRecipeContext} from "../../context/FavoriteRecipesProvider.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {PreviousPageContext} from "../../context/PreviousPageProvider.jsx";


function RecipeDetails({ backButtonText}) {
    const { id } = useParams()
    const [ recipeDetails, setRecipeDetails ] = useState([])
    const [ ingredientsClassname, setIngrdientsClassname ] = useState('recipe-details-ingredients')
    const [ allergensClassname, setAllergensClassname ] = useState('recipe-details-dont-display')
    const [ nutrientsClassname, setNutrientsClassname ] = useState('recipe-details-dont-display')

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
        ingredientsClassname === "recipe-details-dont-display" &&
            setIngrdientsClassname("recipe-details-ingredients")
            setAllergensClassname("recipe-details-dont-display")
        setNutrientsClassname('recipe-details-dont-display')

    }

    function handleAllergenButton() {
        allergensClassname === "recipe-details-dont-display" &&
            setAllergensClassname("recipe-details-allergens")
            setIngrdientsClassname("recipe-details-dont-display")
            setNutrientsClassname('recipe-details-dont-display')

    }

    function handleNutrientButton() {
        nutrientsClassname === "recipe-details-dont-display" &&
            setNutrientsClassname('recipe-details-nutrients')
            setIngrdientsClassname('recipe-details-dont-display')
            setAllergensClassname("recipe-details-dont-display")

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

    const { isAuth } = useContext(AuthContext)

    const { previousPage } = useContext(PreviousPageContext)


    return (
        <article className="recipe-details-container">

            <div>
                <button
                    className="recipe-details-button-top"
                    onClick={() => previousPage && navigate(previousPage)}
                    type="button"

                >
                    <FontAwesomeIcon className="back-icon" icon={faAnglesLeft} /><p>{backButtonText}</p>
                </button>

                {isAuth &&
                    <button
                        className='favorite-button'
                        onClick={handleButtonClick}
                        type="button"
                    ><FontAwesomeIcon icon={faStar} className={favoriteState.classname}/>
                    </button>}


            </div>

            <section className='recipe-details-top'>
                    <img
                        src={recipeDetails.image}
                        className="detail-page-img"
                    />
                <div className="recipe-details-info">
                    <h2>{recipeDetails.label}</h2>
                    <span className="icon-number-wrapper">
                        <FontAwesomeIcon className="icon-detail-page" icon={faClock}/>
                        <div>
                            <p>{recipeDetails.totalTime}</p>
                            <p>min</p>
                        </div>
                        <FontAwesomeIcon className="icon-detail-page" icon={faFireFlameCurved} />
                        <div>
                            <p>{Math.round(recipeDetails.calories)}</p>
                            <p>kCal</p>
                        </div>
                    </span>
                    <div className="recipe-details-tags">
                        {recipeDetails.dietLabels && recipeDetails.dietLabels.map((label) => {return <p key={label}>{label}</p>})}
                        {recipeDetails.cuisineType && recipeDetails.cuisineType.map((type) => {return <p key={type}>{type}</p>})}
                        {recipeDetails.mealType && recipeDetails.mealType.map((type) => {return <p key={type}>{type}</p>})}
                        {recipeDetails.dishType && recipeDetails.dishType.map((type) => {return <p key={type}>{type}</p> })}
                    </div>
                </div>
            </section>
            <section className="recipe-details-middle">
                <div className="recipe-details-button-wrap">
                    <button
                        className="recipe-details-button"
                        value="ingredients"
                        onClick={handleIngredientButton}
                        type="button"
                    >Ingredients</button>
                    <button
                        className="recipe-details-button"
                        value="allergens"
                        onClick={handleAllergenButton}
                        type="button"
                    >Health labels</button>
                    <button
                        className="recipe-details-button"
                        value="nutrients"
                        onClick={handleNutrientButton}
                        type="button"
                    >Nutrients</button>
                    <button
                        className="recipe-details-button"
                        onClick={handleDirectionsLink}
                        type="button"
                    >Directions</button>
                </div>
            </section>

            <section className="recipe-details-bottom">
                <ul className={ingredientsClassname}>
                    { recipeDetails.ingredients && recipeDetails.ingredients.map((ingredient) =>{
                        return (
                                <li key={ingredient.food}>
                                    <img src={ingredient.image}/>
                                    <p>{ingredient.food}</p>
                                    <p className="ingredient-amount">
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
                        <p className="description description-nutrient">Nutrient</p>
                        <p className="description description-quantity">Quantity</p>
                        <p className="description description-daily">% of daily requirements</p>
                    </li>
                    {nutrientArray && nutrientArray.map((nutrient) => {
                        return (
                            <li
                                key={nutrient.label}
                                >
                                <p className="nutrient-label">{nutrient.label}</p>
                                <p className="nutrient-quantity">{Math.round(nutrient.quantity)}{nutrient.unit}</p>
                                <p className="daily-nutrient">{dailyNutrientArray.map((dailyNutrient) => {
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