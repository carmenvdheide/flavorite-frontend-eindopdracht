import './all-recipes.css'
import axios from "axios";
import React, {useContext, useEffect, useState} from "react"
import RecipeCard from "../../components/recipe-card/recipe-card.jsx";
import SearchBar from "../../components/searchBar/SearchBar.jsx";
import Filters from "../../components/Filters /Filters.jsx";
import Loading from "../../components/loading/loading.jsx";
import {fetchRecipes} from "../../helpers/apiFetch.js";
import {SearchedRecipesContext} from "../../context/SearchedRecipesProvider.jsx";
import { faCircleChevronLeft, faCircleChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function AllRecipes() {

    //////////////////////////////////////////////////////////////////////////////// useState



    const [ isLoading, setIsLoading ] = useState('')
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

    const [ dietFilters, setDietFilters ] = useState([
        {name: "balanced", checked: false, type: "diet"},
        {name: "high-fiber", checked: false, type: "diet"},
        {name: "high-protein", checked: false, type: "diet"},
        {name: "low-carb", checked: false, type: "diet"},
        {name: "low-fat", checked: false, type: "diet"},
        {name: "low-sodium", checked: false, type: "diet"},
    ])

    const [ mealTypeFilters, setMealTypeFilters ] = useState([
        {name: "breakfast", checked: false, type: "mealType"},
        {name: "brunch", checked: false, type: "mealType"},
        {name: "lunch", checked: false, type: "mealType"},
        {name: "dinner", checked: false, type: "mealType"},
        {name: "snack", checked: false, type: "mealType"},
        {name: "teatime", checked: false, type: "mealType"},
    ])

    const [eatingHabitFilters, setEatingHabitFilters ] = useState([
        {name: "vegetarian", checked: false, type: "health"},
        {name: "vegan", checked: false, type: "health"},
    ])


    const [ allergenFilterParam, setAllergenFilterParam ] = useState('')

    const [ dietFilterParam, setDietFilterParam ] = useState('')

    const [ mealTypeFiltersParam, setMealTypeFiltersParam ] = useState('')

    const [ eatingHabitFilterParam, setEatingHabitFilterParam ] = useState('')

    const [ filtersDisplay, setFiltersDisplay ] = useState('dont-display-filters')

    const [ nextPage, setNextPage ] = useState("")

    const [ sortBy, setSortBy ] = useState('')
    const [ classnamePageButton, setClassnamePageButton ] = useState('dont-display-page-button')
    const [ classnameSortBy, setClassnameSortBy ] = useState('dont-display-page-button')


    //////////////////////////////////////////////////////////////////////////////// useContext

    const { setSearchedRecipesData } = useContext(SearchedRecipesContext)

    const { recipeData } = useContext(SearchedRecipesContext)

    const { setNextPageSearchedRecipes } = useContext(SearchedRecipesContext)

    const { nextPageSearched } = useContext(SearchedRecipesContext)

    const { setPageDataSearched } = useContext(SearchedRecipesContext)

    const { pageDataSearched } = useContext(SearchedRecipesContext)

    const { pageCountSearched } = useContext(SearchedRecipesContext)

    const { setPageCountSearched } = useContext(SearchedRecipesContext)

    const { searched } = useContext(SearchedRecipesContext)



    //////////////////////////////////////////////////////////////////////////////// useEffect


    useEffect(() => {
        // Update allergen filter parameter
        let allergenArray = allergenFilters.filter(filter => filter.checked).map(filter => filter.name)
        let allergens = allergenArray.length > 0 ? "&health=" + allergenArray.join('&health=') : ''
        setAllergenFilterParam(allergens)

        // Update diet filter parameter
        let dietArray = dietFilters.filter(filter => filter.checked).map(filter => filter.name)
        let diets = dietArray.length > 0 ? "&diet=" + dietArray.join('&diet=') : ''
        setDietFilterParam(diets)

        // Update meal type filter parameter
        let mealTypeArray = mealTypeFilters.filter(filter => filter.checked).map(filter => filter.name)
        let mealType = mealTypeArray.length > 0 ? "&mealType=" + mealTypeArray.join('&mealType=') : ''
        setMealTypeFiltersParam(mealType)

        // Update eating habit filter parameter
        let eatingHabitArray = eatingHabitFilters.filter(filter => filter.checked).map(filter => filter.name)
        let eatingHabit = eatingHabitArray.length > 0 ? "&health=" + eatingHabitArray.join('&health=') : ''
        setEatingHabitFilterParam(eatingHabit)


    }, [allergenFilters, dietFilters, mealTypeFilters, eatingHabitFilters])


    useEffect(() => {
        sortData()
    }, [sortBy, data])



    useEffect(() => {
        console.log(nextPage)
    }, [nextPage]);


    useEffect(() => {
        recipeData.length > 0 ? displayPreviousData() : void fetchData()
        console.log(recipeData)
    }, [])




    useEffect(() => {
        setSearchedRecipesData(data)
    }, [data]);

    //////////////////////////////////////////////////////////////////////////////////////////// fetch recipes


    async function fetchData() {
        try {
            setIsLoading('loading');
            await fetchRecipes({
                setIsLoading: setIsLoading,
                setData: setData
            });
            setIsLoading('done');
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setIsLoading('done');
        }
    }




    async function fetchSearchedRecipes(searchValue) {
        setIsLoading('loading')

        console.log("PARAMETERS", eatingHabitFilterParam, allergenFilterParam, dietFilterParam, mealTypeFiltersParam)

        try {
            const filtersParam = `${eatingHabitFilterParam}${allergenFilterParam}${dietFilterParam}${mealTypeFiltersParam}`
            const result = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&type=public${filtersParam}`,
                { params: {
                        q: searchValue,
                    }})
            setData(result.data.hits)
            // setNextPage(result.data['_links'].next.href)
            setNextPageSearchedRecipes(result.data['_links'].next.href)

            console.log(result.data)
            console.log(result.data['_links'].next.href)
            // setPageData(prevState => [...prevState, {page: 1, data: result.data}])
            setPageDataSearched(prevState => [...prevState, {page: 1, data: result.data}])
            setIsLoading('done')

        } catch (e) {
            console.error(e)
            console.log('nope')
            setIsLoading('done')
        }

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////// filter recipes

    function handleFilterButton() {
        filtersDisplay === 'dont-display-filters'
            ? setFiltersDisplay('filters-box')
            : setFiltersDisplay('dont-display-filters')
    }

    function updateCheckStatus(index, type, name) {

        if (type === "health") {
            if (name === "vegetarian" || name === "vegan") {
                setEatingHabitFilters(prevFilters => {
                    const updatedFilters = prevFilters.map((filter, i) => {
                        if (i === index) {
                            return { ...filter, checked: !filter.checked }
                        }
                        return filter
                    })
                    return updatedFilters
                })
            } else {
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
        } else {
            setMealTypeFilters(prevFilters => {
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

    ////////////////////////////////////////////////////////////////////////////////////////////// sort recipes

    function sortData() {
        switch (sortBy) {
            case 'cookingTimeLow':
                setData(prevData => [...prevData].sort((a, b) => a.recipe.totalTime - b.recipe.totalTime))
                break
            case 'cookingTimeHigh':
                setData(prevData => [...prevData].sort((a, b) => b.recipe.totalTime - a.recipe.totalTime))
                break
            case 'caloriesLow':
                setData(prevData => [...prevData].sort((a, b) => a.recipe.calories - b.recipe.calories))
                break
            case 'caloriesHigh':
                setData(prevData => [...prevData].sort((a, b) => b.recipe.calories - a.recipe.calories))
                break
        }

    }

    function handleSortChange(e) {
        const selectedOption = e.target.value
        console.log(e.target.value)
        setSortBy(selectedOption)
    }


    ////////////////////////////////////////////////////////////////////////////////////////////// previous/next page
    async function handleNextPage(url) {

        try {


            const dataNextPage = pageDataSearched.find((dataNext) => dataNext.page === pageCountSearched + 1)


            if (dataNextPage) {
                setData(dataNextPage.data.hits)
            } else {const result = await axios.get(url)

                setData(result.data.hits)
                setNextPageSearchedRecipes(result.data['_links'].next.href)

                setPageDataSearched(prevState => [...prevState, {page: pageCountSearched + 1, data: result.data}])

                console.log(result.data)}
            setPageCountSearched(pageCountSearched + 1)


        } catch (e) {
            console.log('nope..')
        }
    }



    async function handlePreviousPage() {



        const dataPrevPage = pageDataSearched.find((dataPrev) => dataPrev.page === pageCountSearched - 1)

        console.log(dataPrevPage.data.hits)
        dataPrevPage && setData(dataPrevPage.data.hits)
        pageCountSearched > 0 && setPageCountSearched(pageCountSearched - 1)

    }

    ////////////////////////////////////////////////////////////////////////////////////////////// saving data


    function displayPreviousData () {
        setData(recipeData)
        setNextPage(nextPageSearched)
        searched && setClassnameSortBy("sort-options")
        searched && setClassnamePageButton("page-button")
        console.log(recipeData.length)
    }

    ///////////////////////// RETURN


    return ( isLoading === 'loading' ? <Loading/> :

        <>
            <header className="search-container">
                    <SearchBar
                        fetchSearchedRecipes={fetchSearchedRecipes}
                        fetchRecipes={fetchRecipes}
                        handleFilterButton={handleFilterButton}
                        setClassnamePageButton={() => setClassnamePageButton("page-button")}
                        setClassnameSortBy={() => setClassnameSortBy("sort-options")}
                    />
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className={classnameSortBy}>
                    <option value='empty'>sort by</option>
                    <option value='cookingTimeLow'>time (low to high) </option>
                    <option value='cookingTimeHigh'>time (high to low)</option>
                    <option value='caloriesLow'>calories (low to high) </option>
                    <option value='caloriesHigh'>calories (high to low) </option>

                </select>

                <div className={filtersDisplay}>
                    <div className="filter-category">
                        <p>Habits</p>
                        <div>
                            {eatingHabitFilters.map((filter, index) => (
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
                    <div className="filter-category">
                        <p>Allergens</p>
                        <div>
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

                    <div className="filter-category">
                        <p>Diets</p>
                        <div>
                            {dietFilters.map((filter, index) => (
                                <Filters
                                    key={filter.name}
                                    label={filter.name}
                                    index={index}
                                    isChecked={filter.checked}
                                    checkHandler={() => updateCheckStatus(index, filter.type, filter.name) }
                                />
                            ))}
                        </div>

                    </div>

                    <div className="filter-category">
                        <p>Meal Types</p>
                        <div>
                            {mealTypeFilters.map((filter, index) => (
                                <Filters
                                    key={filter.name}
                                    label={filter.name}
                                    isChecked={filter.checked}
                                    checkHandler={() => updateCheckStatus(index, filter.type, filter.name)}
                                />
                            ))}
                        </div>

                    </div>

                </div>
            </header>

            <section className="all-recipes-container">


                <div className="button-wrap">
                    <button
                        onClick={handlePreviousPage}
                        className={classnamePageButton}
                        type="button"
                    ><FontAwesomeIcon icon={faCircleChevronLeft} />previous page</button>
                    <button
                        onClick={() => handleNextPage(nextPageSearched)}
                        className={classnamePageButton}
                        type="button"
                    >next page <FontAwesomeIcon icon={faCircleChevronRight} /></button>
                </div>

                <div className="button-wrap-mobile">
                    <button
                        onClick={handlePreviousPage}
                        className={classnamePageButton}
                        type="button"
                    ><FontAwesomeIcon icon={faCircleChevronLeft} /></button>
                    <button
                        onClick={() => handleNextPage(nextPageSearched)}
                        className={classnamePageButton}
                        type="button"
                    > <FontAwesomeIcon icon={faCircleChevronRight} /></button>
                </div>


                <ul className="all-recipes-list">
                    {data ? data.map((recipe) => {
                        return (
                                <RecipeCard
                                    recipe={recipe}
                                    key={recipe.recipe.uri.split('_')[1]}
                                    classname="recipe-card"
                                    classnameText="recipe-card-text"
                                    classnameIcons="recipe-card-info"
                                    classnameAllergens="recipe-card-allergens"
                                    classnameNavLink="recipe-link"
                                    navlink="recipes"
                                    backButton="/recipes"

                                />
                            )
                    }) : null}
                </ul>
                <div className="button-wrap">
                    <button
                        onClick={handlePreviousPage}
                        className={classnamePageButton}
                        type="button"
                    ><FontAwesomeIcon icon={faCircleChevronLeft} />previous page</button>
                    <button
                        onClick={() => handleNextPage(nextPageSearched)}
                        className={classnamePageButton}
                        type="button"
                    >next page <FontAwesomeIcon icon={faCircleChevronRight} /></button>
                </div>
                <div className="button-wrap-mobile">
                    <button
                        onClick={handlePreviousPage}
                        className={classnamePageButton}
                        type="button"
                    ><FontAwesomeIcon icon={faCircleChevronLeft} /></button>
                    <button
                        onClick={() => handleNextPage(nextPageSearched)}
                        className={classnamePageButton}
                        type="button"
                    > <FontAwesomeIcon icon={faCircleChevronRight} /></button>
                </div>
            </section>

        </>
    )
}

export default AllRecipes



