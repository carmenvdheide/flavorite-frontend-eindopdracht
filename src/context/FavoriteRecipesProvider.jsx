import React, { createContext, useEffect, useState } from "react"


export const FavoriteRecipeContext = createContext(null)

function FavoriteRecipesProvider({children}) {


    let recipeArray = [

    ]


    function setFavoritesArray(recipe) {
        console.log(recipe.label, "---")

        const recipeInfo = {
            label: recipe.label,
            uri: recipe.uri
        }
        recipeArray.push(recipeInfo)
        console.log(recipeArray, "///////")

        const recipeString = JSON.stringify(recipeArray)

        console.log(recipeString, "|||||||||||")

        localStorage.setItem('favorite', recipeString)

    }







    const contextData = {
        setFavoritesArray: setFavoritesArray,
    }

    return (
        <FavoriteRecipeContext.Provider value={contextData}>
            {children}
        </FavoriteRecipeContext.Provider>
    )
}

export default FavoriteRecipesProvider