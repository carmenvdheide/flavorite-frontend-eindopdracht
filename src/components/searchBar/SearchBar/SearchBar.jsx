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
                    searchBarValue
                        ? props.fetchSearchedRecipes(searchBarValue)
                        : props.fetchRecipes
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