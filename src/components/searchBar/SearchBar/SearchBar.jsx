import {useState} from "react";

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
        </div>

    )
}

export default SearchBar