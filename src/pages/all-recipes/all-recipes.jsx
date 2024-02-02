
import './all-recipes.css'

import RecipeCard from "../../components/recipe-card/recipe-card.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "../../components/searchBar/SearchBar/SearchBar.jsx";
import AllergenFilters from "../../components/AllergenFilters/AllergenFilters.jsx";
import DietFilters from "../../components/dietFilters/DietFilters.jsx";


function AllRecipes() {
    const [ data, setData ] = useState([])
    const [ allergenFilters, setAllergenFilters ] = useState([
        {name: "dairy-free", checked: false, type: "health"},
        {name: "gluten-free", checked: false, type: "health"},
        {name: "celery-free", checked: false, type: "health"},
        {name: "egg-free", checked: false, type: "health"},
        {name: "soy-free", checked: false, type: "health"},
        {name: "peanut-free", checked: false, type: "health"},
        {name: "fish-free", checked: false, type: "health"},
        {name: "mustard-free", checked: false, type: "health"},
        {name: "sulfite-free", checked: false, type: "health"},
        {name: "lupin-free", checked: false, type: "health"},
        {name: "sesame-free", checked: false, type: "health"},
        {name: "tree-nut-free", checked: false, type: "health"},
        {name: "alcohol-free", checked: false, type: "health"},
        {name: "crustcean-free", checked: false, type: "health"},
        {name: "mollusk-free", checked: false, type: "health"},
    ])

    const [ allergenFilterParam, setAllergenFilterParam ] = useState('')

    const [ dietFilters, setDietFilters ] = useState([
        {name: "balanced", checked: false, type: "diet"},
        {name: "high-fiber", checked: false, type: "diet"},
        {name: "high-protein", checked: false, type: "diet"},
        {name: "low-carb", checked: false, type: "diet"},
        {name: "low-fat", checked: false, type: "diet"},
        {name: "low-sodium", checked: false, type: "diet"},
    ])

    const [ dietFilterParam, setDietFilterParam ] = useState('')


    function updateCheckStatus(index, type) {

        if (type === "health") {
            setAllergenFilters(prevFilters => {
                const updatedFilters = prevFilters.map((filter, i) => {
                    if (i === index) {
                        return { ...filter, checked: !filter.checked }
                    }
                    return filter
                })
                return updatedFilters
            })
        } else if (type === "diet") {
            setDietFilters(prevFilters => {
                const updatedFilters = prevFilters.map((filter, i) => {
                    if (i === index) {
                        return { ...filter, checked: !filter.checked }
                    }
                    return filter
                })
                return updatedFilters
            })
        }

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
        let dietArray = dietFilters.filter(filter => filter.checked).map(filter => filter.name)
        let allergens = dietArray.length > 0
            ? "&diet=" + dietArray.join('&diet=')
            : ''
        setDietFilterParam(allergens)
        console.log(allergens)

    }, [dietFilters])








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

         console.log("PARAMETERS",allergenFilterParam)

        try {
            const result = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&type=public${allergenFilterParam}${dietFilterParam}` ,
                { params: {
                        q: searchValue,
                    }})
            setData(result.data.hits)
            console.log(result.data.hits)
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

                <div className="filtersBox">
                    <div>
                        {allergenFilters.map((filter, index) => (
                                <AllergenFilters
                                    key={filter.name}
                                    label={filter.name}
                                    index={index}
                                    isChecked={filter.checked}
                                    checkHandler={() => updateCheckStatus(index, filter.type)}
                                />
                            )

                        )}
                    </div>

                    <div>
                        {dietFilters.map((filter, index) => (
                            <DietFilters
                                key={filter.name}
                                label={filter.name}
                                index={index}
                                isChecked={filter.checked}
                                checkHandler={() => updateCheckStatus(index, filter.type) }
                            />
                        ))}
                    </div>



                </div>



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
