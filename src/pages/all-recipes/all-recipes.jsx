
import './all-recipes.css'

import RecipeCard from "../../components/recipe-card/recipe-card.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar/SearchBar.jsx";
import Filters from "../../components/filters /Filters.jsx";


function AllRecipes() {
    const [ data, setData ] = useState([])
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


    function updateCheckStatus(index) {
        console.log("CLICK", index)
        setAllergenFilters(
        [
            ...allergenFilters.slice(0, index),
            {...allergenFilters[index], checked: !allergenFilters[index].checked},
            ...allergenFilters.slice(index + 1)
        ])}


    async function fetchRecipes() {
        try {

            const result = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public`, { params: {
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
            console.log(allergenFilters)
            const result = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&type=public` ,
                { params: {
                        q: searchValue,
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

                {allergenFilters.map((filter, index) => (
                        <Filters
                            key={filter.name}
                            label={filter.name}
                            index={index}
                            isChecked={filter.checked}
                            checkHandler={() => updateCheckStatus(index)}
                        />
                    )

                )}

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
