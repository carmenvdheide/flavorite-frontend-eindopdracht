import React, {createContext, useState} from "react"


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