
import './all-recipes.css'

import RecipeCard from "../../components/recipe-card/recipe-card.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


function AllRecipes() {
    const [ data, setData ] = useState([])
    const [ inputValue, setInputValue] = useState('')

    async function fetchRecipes() {

        try {
            const result = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public', { params: {
                    mealType: 'Dinner',
                    dishType: 'Main course',
                    random: true,
                }})
            console.log("result hits:", result.data.hits)
            setData(
                result.data.hits
            )
        } catch (e) {
            console.error(e)
            console.log('nope')
        }
    }

    async function fetchSearchedRecipes() {
        console.log(inputValue)
        try {
            console.log(inputValue, "DEZE")
            const result = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&type=public',
                { params: {
                        q: inputValue
                    }})
            setData(result.data.hits)
            console.log(result)
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
            <section className="searchContainer">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="search"
                />
                <button
                    className="recipeSearchButton"
                    onClick={inputValue ? fetchSearchedRecipes : fetchRecipes}
                >go</button>
            </section>

            <section className="allRecipesContainer">
                <ul className="allRecipesList">
                    {data && data.map((recipe) => {
                        return (
                                <RecipeCard recipe={recipe} key={recipe.recipe.uri.split('_')[1]}/>
                            )

                    })}

                </ul>
            </section>

        </>
    )
}

export default AllRecipes