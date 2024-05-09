import React, {useContext} from "react"
import {useState} from "react";
import "./SearchBar.css"
import {SearchedRecipesContext} from "../../../context/SearchedRecipesProvider.jsx";

function SearchBar(props) {
    const [searchBarValue, setSearchBarValue] = useState('')
    const { setSearched } = useContext(SearchedRecipesContext)


    function handleSearch(e) {


        e.preventDefault()

        searchBarValue && props.fetchSearchedRecipes(searchBarValue)
        searchBarValue && props.setClassnamePageButton("page-button")
        searchBarValue && props.setClassnameSortBy("sort-options")
        searchBarValue && setSearched(true)

    }

    return (
        <div className="search-bar">

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    placeholder="search"
                    className="search-input"
                />
                <button
                    className="recipe-search-button"
                >Go</button>
            </form>

            <button
                className="recipe-filter-button"
                onClick={() => { props.handleFilterButton()}}
            >Filters</button>
        </div>

    )
}

export default SearchBar
