import React, {createContext, useEffect, useState} from "react"


export const SearchedRecipesContext = createContext(null)

function SearchedRecipesProvider({children}) {

    const [recipeData, setRecipeData] = useState([])
    const [ nextPageSearched , setNextPageSearched ] = useState('')
    const [ pageDataSearched, setPageDataSearched ] = useState([])

    const [pageCountSearched, setPageCountSearched] = useState(1)

    const [ searched, setSearched ] = useState(false)

    const [ searchValue, setSearchValue ] = useState('search')



    function setSearchedRecipesData(data) {
        setRecipeData(data)
    }

    useEffect(() => {
        console.log(searchValue)
    }, [searchValue]);

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
        setSearched: setSearched,
        searched: searched,
        searchValue: searchValue,
        setSearchValue: setSearchValue,

    }

    return (
        <SearchedRecipesContext.Provider value={contextData}>
            {children}
        </SearchedRecipesContext.Provider>
    )
}

export default SearchedRecipesProvider