import Button from "../../components/button/button.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import './random-recipe.css'
import Filters from "../../components/Filters /Filters.jsx";

function RandomRecipe() {
    const [ surpriseButtonText, setSurpriseButtonText ] = useState('surprise me')
    const [ stateMealType, setStateMealType ] = useState(null)
    const [ randomRecipeData, setRandomRecipeData] = useState(null)

    const [ allergenFilters, setAllergenFilters ] = useState([

        {name: "dairy-free", checked: false},
        {name: "gluten-free", checked: false},
        {name: "celery-free", checked: false},
        {name: "egg-free", checked: false},
        {name: "soy-free", checked: false},
        {name: "peanut-free", checked: false},
        {name: "fish-free", checked: false},
        {name: "mustard-free", checked: false},
        {name: "sulfite-free", checked: false},
        {name: "lupin-free", checked: false},
        {name: "sesame-free", checked: false},
        {name: "tree-nut-free", checked: false},
        {name: "alcohol-free", checked: false},
        {name: "crustcean-free", checked: false},
        {name: "mollusk-free", checked: false},
    ])

    const [ allergenFilterParam, setAllergenFilterParam ] = useState('')

    function handleRandomButton() {
        setSurpriseButtonText('next')


        async function fetchRandomRecipe() {
            try {
                const result = await axios.get(`https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public${allergenFilterParam}`, { params: {
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

        ///////////////////////////////////// idk

        // e.target.value === "Breakfast" &&
        //     setBreakfast(breakfast === '' ? "clickedButton" : '')
        //     setLunch('')
        //     setDinner('')
        //
        // e.target.value === "Lunch" &&
        // setBreakfast('')
        // setLunch(lunch === '' ? "clickedButton" : '')
        // setDinner('')
        //
        // e.target.value === "Dinner" &&
        // setBreakfast('')
        // setLunch('')
        // setDinner(dinner === '' ? 'clickedButton' : '')


    }

    function updateCheckStatus(index) {
        setAllergenFilters(prevFilters => {
            const updatedFilters = prevFilters.map((filter, i) => {
                if (i === index) {
                    return { ...filter, checked: !filter.checked }
                }
                return filter
            })
            return updatedFilters
        })
    }

    useEffect(() => {
        let allergenArray = allergenFilters.filter(filter => filter.checked).map(filter => filter.name)
        let allergens = allergenArray.length > 0
            ? "&health=" + allergenArray.join('&health=')
            : ''
        setAllergenFilterParam(allergens)
        console.log(allergens)

    }, [allergenFilters])

    const [breakfast, setBreakfast ] = useState('')
    const [lunch, setLunch ] = useState('')
    const [dinner, setDinner ] = useState('')

    return (
        <>
            <section className="randomRecipeFilters">
                <div className="randomRecipeMealType">
                    <p>select a meal-type:</p>
                    <Button
                        text="breakfast"
                        className={breakfast}
                        onClick={handleMealType}
                        value="Breakfast"/>
                    <Button
                        text="lunch"
                        className={lunch}
                        onClick={handleMealType}
                        value="Lunch"/>
                    <Button
                        text="dinner"
                        className={dinner}
                        onClick={handleMealType}
                        value="Dinner"/>

                </div>

                <div className="randomRecipeAllergens">
                    <p>select allergens:</p>
                    <div className="checkboxAllergensRandom">
                        {allergenFilters.map((filter, index) => (
                            <Filters
                                key={filter.name}
                                label={filter.name}
                                index={index}
                                isChecked={filter.checked}
                                checkHandler={() => updateCheckStatus(index, filter.type, filter.name)}
                            />

                        ))}
                    </div>
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