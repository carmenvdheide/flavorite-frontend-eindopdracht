import React, {createContext, useEffect, useState} from "react"
import { useLocation } from "react-router-dom";


export const SearchedRecipesContext = createContext(null)

function SearchedRecipesProvider({children}) {

    const [recipeData, setRecipeData] = useState([])
    const [ nextPageSearched , setNextPageSearched ] = useState('')
    const [ pageDataSearched, setPageDataSearched ] = useState([])

    const [pageCountSearched, setPageCountSearched] = useState(1)


    function setSearchedRecipesData(data) {
        setRecipeData(data)
    }

    function setNextPageSearchedRecipes(link) {
        setNextPageSearched(link)
    }

    useEffect(() => {
        console.log(recipeData)
    }, [recipeData]);

    useEffect(() => {
        console.log(nextPageSearched)
    }, [nextPageSearched]);

    useEffect(() => {
        console.log(pageDataSearched)
    }, [pageDataSearched]);

    useEffect(() => {
        console.log(pageCountSearched)
    }, [pageCountSearched])

    const contextData = {
        setSearchedRecipesData: setSearchedRecipesData,
        recipeData: recipeData,
        setNextPageSearchedRecipes: setNextPageSearchedRecipes,
        nextPageSearched: nextPageSearched,
        pageDataSearched: pageDataSearched,
        setPageDataSearched: setPageDataSearched,
        pageCountSearched: pageCountSearched,
        setPageCountSearched: setPageCountSearched,

    }

    return (
        <SearchedRecipesContext.Provider value={contextData}>
            {children}
        </SearchedRecipesContext.Provider>
    )
}

export default SearchedRecipesProvider