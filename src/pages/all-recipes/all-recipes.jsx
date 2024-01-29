
import './all-recipes.css'

import RecipeCard from "../../components/recipe-card/recipe-card.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar/SearchBar.jsx";
import Filters from "../../components/filters /Filters.jsx";


function AllRecipes() {
    const [ data, setData ] = useState([])
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

     async function fetchSearchedRecipes(searchValue) {
        try {
            const result = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&type=public',
                { params: {
                        q: searchValue
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
            <section className="searchContainer">
                <SearchBar
                    fetchSearchedRecipes={fetchSearchedRecipes}
                    fetchRecipes={fetchRecipes}
                />
                <Filters/>
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
