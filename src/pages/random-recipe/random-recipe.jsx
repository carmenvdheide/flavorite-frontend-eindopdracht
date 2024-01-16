import Button from "../../components/button/button.jsx";
import {useState} from "react";
import axios from "axios";

function RandomRecipe() {
    const [ surpriseButtonText, setSurpriseButtonText ] = useState('surprise me')
    const [ stateMealType, setStateMealType ] = useState(null)
    const [ randomRecipeData, setRandomRecipeData] = useState(null)

    function handleRandomButton() {
        setSurpriseButtonText('nope, next')


        async function fetchRandomRecipe() {
            try {
                const result = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public', { params: {
                        mealType: stateMealType,
                        dishType: "main course",
                        random: true,
                    }})
                console.log(result.data.hits[0])
                setRandomRecipeData(result.data.hits[0])

            } catch (e) {
                console.error(e)
                console.log('nope')
            }
        }
        return fetchRandomRecipe()
    }


    function handleMealType(e) {
        setStateMealType(e.target.value)
        console.log(e.target.value)
    }


    return (
        <>
            <section>
                <div>
                    <Button
                        text="breakfast"
                        className="mealType"
                        onClick={handleMealType}
                        value="Breakfast"/>
                    <Button
                        text="lunch"
                        className="mealType"
                        onClick={handleMealType}
                        value="Lunch"/>
                    <Button
                        text="dinner"
                        className="mealType"
                        onClick={handleMealType}
                        value="Dinner"/>
                </div>

                <Button
                    text={surpriseButtonText}
                    className="surpriseButton"
                    onClick={handleRandomButton}/>
            </section>

            {randomRecipeData ?
                <section>
                    <p>{randomRecipeData.recipe.label}</p>
                    <p>{randomRecipeData.recipe.mealType}</p>
                    <p>{randomRecipeData.recipe.dishType}</p>
                </section>

            : ""}


        </>
    )
}

export default RandomRecipe