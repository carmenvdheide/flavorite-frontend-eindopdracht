import React, { createContext} from "react"
import { useLocation } from "react-router-dom";


export const FavoriteRecipeContext = createContext(null)

function FavoriteRecipesProvider({children}) {

    const location = useLocation()
    let recipeArray = [

    ]


    function setFavoritesArray(recipe) {
        console.log(recipe.label, "---")

        const storedFavorites = localStorage.getItem('favorite')

        if (storedFavorites) {
            recipeArray = JSON.parse(storedFavorites)

            const isRecipeAlreadyAdded = recipeArray.some(existingRecipe => existingRecipe.label === recipe.label)

            if (isRecipeAlreadyAdded) {
                console.log('Recipe is already in favorites.')
                return
            }
        }

        const recipeInfo = {
            label: recipe.label,
            image: recipe.image,
            uri: recipe.uri
        }
        recipeArray.push(recipeInfo)
        console.log(recipeArray, "///////")

        const recipeString = JSON.stringify(recipeArray)

        console.log(recipeString, "|||||||||||")

        localStorage.setItem('favorite', recipeString)

    }

    function deleteFavoriteRecipe(recipeLabelToDelete) {

        const storedFavorites = localStorage.getItem('favorite')
        if (storedFavorites) {

            let favorites = JSON.parse(storedFavorites)
            console.log(favorites)

            const indexToDelete = favorites.findIndex(recipe => recipe.label === recipeLabelToDelete)

            if (indexToDelete !== -1) {
                favorites.splice(indexToDelete, 1)

                localStorage.setItem('favorite', JSON.stringify(favorites))

                location.pathname === '/profile' && window.location.reload()

            }
        }
    }







    const contextData = {
        setFavoritesArray: setFavoritesArray,
        deleteFavoriteRecipe: deleteFavoriteRecipe,
    }

    return (
        <FavoriteRecipeContext.Provider value={contextData}>
            {children}
        </FavoriteRecipeContext.Provider>
    )
}

export default FavoriteRecipesProvider