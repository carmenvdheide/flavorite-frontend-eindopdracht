import React from "react"
import {useState} from "react";
import "./SearchBar.css"

function SearchBar(props) {
    const [searchBarValue, setSearchBarValue] = useState('')

    return (
        <div className="searchBar">
            <input
                type="text"
                value={searchBarValue}
                onChange={(e) => setSearchBarValue(e.target.value)}
                placeholder="search"
            />
            <button
                className="recipeSearchButton"
                onClick={() => {

                    searchBarValue &&
                        props.fetchSearchedRecipes(searchBarValue)
                        props.setClassnamePageButton("pageButton")
                        props.setClassnameSortBy("sortOptions")

                    !searchBarValue && setSearchBarValue("empty field")


                }}

            >go</button>
            <button
                className="recipeFilterButton"
                onClick={() => { props.handleFilterButton()}}
            >Filters</button>
        </div>

    )
}

export default SearchBar

// function sortData(sortByOption) {
//     switch (sortByOption) {
//         case 'cookingTimeLow':
//             setData(prevData => [...prevData].sort((a, b) => a.recipe.totalTime - b.recipe.totalTime))
//             break
//         case 'cookingTimeHigh':
//             setData(prevData => [...prevData].sort((a, b) => b.recipe.totalTime - a.recipe.totalTime))
//             break
//         case 'caloriesLow':
//             setData(prevData => [...prevData].sort((a, b) => a.recipe.calories - b.recipe.calories))
//             break
//         case 'caloriesHigh':
//             setData(prevData => [...prevData].sort((a, b) => b.recipe.calories - a.recipe.calories))
//             break
//     }
//
//     function handleSortChange(e) {
//         const selectedOption = e.target.value
//         setSortBy(selectedOption)
//         const sorted = sortData(selectedOption)
//         setData(sorted)
//
//     }