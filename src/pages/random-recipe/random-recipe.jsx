import React, {useEffect} from "react"
import { useState} from "react";
// import axios from "axios";
import './random-recipe.css'
import Filters from "../../components/Filters /Filters.jsx";
import RecipeCard from "../../components/recipe-card/recipe-card.jsx";
import Loading from "../../components/loading/loading.jsx";
import {fetchRandom} from "../../helpers/apiFetch.js";

function RandomRecipe() {
    // const [ surpriseButtonText, setSurpriseButtonText ] = useState('surprise me')
    const [ stateMealType, setStateMealType ] = useState(null)
    const [ randomRecipeData, setRandomRecipeData] = useState(null)

    const [ allergenFilters, setAllergenFilters ] = useState([

        {name: "dairy-free", checked: false},
        {name: "gluten-free", checked: false},
        {name: "celery-free", checked: false},
        {name: "egg-free", checked: false},
        {name: "soy-free", checked: false},
        {name: "peanut-free", checked: false},
        {name: "fish-free", checked: false},
        {name: "mustard-free", checked: false},
        {name: "sulfite-free", checked: false},
        {name: "lupin-free", checked: false},
        {name: "sesame-free", checked: false},
        {name: "tree-nut-free", checked: false},
        {name: "alcohol-free", checked: false},
        {name: "crustcean-free", checked: false},
        {name: "mollusk-free", checked: false},
    ])

    const [ allergenFilterParam, setAllergenFilterParam ] = useState('')

    const [ isLoading, setIsLoading ] = useState('')



    async function handleRandomButton() {
        try {
            setIsLoading('loading');
            await fetchRandom({ setIsLoading, allergenFilterParam, stateMealType, setRandomRecipeData });
            console.log(stateMealType)
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setIsLoading('done');
        }
    }


    function handleMealType(e) {
        setStateMealType(e.target.value)
        console.log(e.target.value)

    }

    function updateCheckStatus(index) {
        setAllergenFilters(prevFilters => {
            const updatedFilters = prevFilters.map((filter, i) => {
                if (i === index) {
                    return { ...filter, checked: !filter.checked }
                }
                return filter
            })
            return updatedFilters
        })
    }

    useEffect(() => {
        let allergenArray = allergenFilters.filter(filter => filter.checked).map(filter => filter.name)
        let allergens = allergenArray.length > 0
            ? "&health=" + allergenArray.join('&health=')
            : ''
        setAllergenFilterParam(allergens)
        console.log(allergens)

    }, [allergenFilters])

    useEffect(() => {
        void handleRandomButton()
    }, []);


    return (
        <>
            <section className="randomRecipeFilters">
                <div className="randomRecipeMealType">
                    <p>select a meal-type:</p>
                    <div>
                        <button
                            onClick={handleMealType}
                            value="Breakfast"
                        className={stateMealType === "Breakfast" ? "clicked-meal-type" : "unclicked-meal-type"}>Breakfast</button>

                        <button
                            onClick={handleMealType}
                            value="Lunch"
                            className={stateMealType === "Lunch" ? "clicked-meal-type" : "unclicked-meal-type"}>Lunch</button>
                        <button
                            onClick={handleMealType}
                            value="Dinner"
                            className={stateMealType === "Dinner" ? "clicked-meal-type" : "unclicked-meal-type"}>Dinner</button>
                    </div>


                </div>

                <div className="randomRecipeAllergensFilter">
                    <p>select allergens:</p>
                    <div className="checkboxAllergensRandom">
                        {allergenFilters.map((filter, index) => (
                            <Filters
                                key={filter.name}
                                label={filter.name}
                                index={index}
                                isChecked={filter.checked}
                                checkHandler={() => updateCheckStatus(index, filter.type, filter.name)}
                            />

                        ))}
                    </div>
                </div>

                <button
                    className='surpriseButton'
                    onClick={handleRandomButton}
                >surprise me</button>

            </section>

            {isLoading === 'loading' ? <Loading/> : randomRecipeData &&
                <RecipeCard
                    recipe={randomRecipeData}
                    classname="randomRecipeCard"
                    classnameText="randomRecipeCardText"
                    classnameIcons="randomRecipeInfo"
                    classnameAllergens="randomRecipeAllergens"
                    classnameNavLink="randomRecipeLink"
                    navlink="random"
                />

            }


        </>
    )
}

export default RandomRecipe