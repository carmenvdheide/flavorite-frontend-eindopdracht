import {useEffect} from "react";

function FavoriteRecipes(recipeDetails) {
    const recipe = {
        label: recipeDetails.label,
        uri: recipeDetails.uri,

    }
     let recipeArray = [

     ]

    recipeArray.push(recipe)

    console.log(recipeArray)

    const recipeString = JSON.stringify(recipe)

    localStorage.setItem('favorite', recipeString)

}

export default FavoriteRecipes
