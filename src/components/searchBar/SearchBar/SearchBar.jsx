import React from "react"
import {useState} from "react";
import "./SearchBar.css"

function SearchBar(props) {
    const [searchBarValue, setSearchBarValue] = useState('')

    function handleSearch(e) {
        e.preventDefault()

        searchBarValue && props.fetchSearchedRecipes(searchBarValue)
        searchBarValue && props.setClassnamePageButton("pageButton")
        searchBarValue && props.setClassnameSortBy("sortOptions")

    }

    return (
        <div className="searchBar">

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    placeholder="search"
                />
                <button
                    className="recipeSearchButton"

                >go</button>
            </form>

            <button
                className="recipeFilterButton"
                onClick={() => { props.handleFilterButton()}}
            >Filters</button>
        </div>

    )
}

export default SearchBar
