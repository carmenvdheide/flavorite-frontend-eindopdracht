import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

function RecipeDetails() {
    const { id } = useParams()
    const [ recipeDetails, setRecipeDetails ] = useState([])


    async function fetchRecipeDetails() {
        try {
            const result = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public`)
            console.log("result:",result)

            setRecipeDetails(
                result.data.recipe
            )
        } catch (e) {
            console.error(e)
            console.log('nope')
        }
    }

    useEffect(() => {
        void fetchRecipeDetails()
    }, [])


    return (
        <p>{recipeDetails.label}</p>
    )
}

export default RecipeDetails