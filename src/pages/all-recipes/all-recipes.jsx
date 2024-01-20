import axios from "axios";
import {useEffect, useState} from "react";
import './all-recipes.css'
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faFireFlameCurved} from "@fortawesome/free-solid-svg-icons/faFireFlameCurved";
import celeryFree from "../../assets/celeryfree.png"
import glutenFree from "../../assets/glutenfree.png"
import crustceanFree from "../../assets/crustceanfree.png"
import eggFree from "../../assets/eggfree.png"
import fishFree from "../../assets/fishfree.png"
import lupinFree from "../../assets/lupinfree.png"
import dairyFree from "../../assets/dairyfree.png"
import molluscFree from "../../assets/molluscfree.png"
import treeNutFree from "../../assets/treenutfree.png"
import peanutFree from "../../assets/peanutfree.png"
import sesameFree from "../../assets/sesamefree.png"
import soyFree from "../../assets/soyfree.png"
import mustardFree from "../../assets/mustardfree.png"
import alcoholFree from "../../assets/alcoholfree.png"
import sulfiteFree from "../../assets/sulfitefree.png"

function AllRecipes() {


    const [ data, setData ] = useState([])

    async function fetchRecipes() {
        try {
            const result = await axios.get('https://api.edamam.com/api/recipes/v2?app_id=5512310a&app_key=efdf28b15f81638625269787d80913f7&q=a&type=public', { params: {
                    mealType: 'Dinner',
                    dishType: 'Main course',
                    random: true,
                }})
            console.log("result hits:",result.data.hits)
            setData(
                result.data.hits
            )
        } catch (e) {
            console.error(e)
            console.log('nope')
        }
    }

    function handleAllergens(data) {
        console.log('HIER ' + data.recipe.healthLabels)
        return(
            <>
                {data.recipe.healthLabels.includes("Alcohol-Free") && <img src={alcoholFree} className="allergenIcon" />}

                {data.recipe.healthLabels.includes("Celery-Free") && <img src={celeryFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Crustcean-Free") && <img src={crustceanFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Dairy-Free") && <img src={dairyFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Egg-Free") && <img src={eggFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Fish-Free") && <img src={fishFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Gluten-Free") && <img src={glutenFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Lupine-Free") && <img src={lupinFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Mollusk-Free") && <img src={molluscFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Mustard-Free") && <img src={mustardFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Peanut-Free") && <img src={peanutFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Sesame-Free") && <img src={sesameFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Soy-Free") && <img src={soyFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Sulfite-Free") && <img src={sulfiteFree} className="allergenIcon" />}
                {data.recipe.healthLabels.includes("Tree-Nut-Free") && <img src={treeNutFree} className="allergenIcon" />}



            </>


        )

    }


    useEffect(() => {
        void fetchRecipes()
    }, [])


    return (

        <>
            <p>RECIPES</p>

            <section className="allRecipesContainer">
                <ul className="allRecipesList">
                    {data.map((recipe) => (
                        <NavLink
                            to="/"
                            key={recipe.recipe.uri.split('_')[1]}
                            className="recipe-link">
                        <li
                            className="recipeCard">
                            <img
                                className="recipePageImage"
                                src={recipe.recipe.image}/>
                            <h3 className="recipePageName">{recipe.recipe.label}</h3>
                            <section className="recipeCardInfo">
                                <div>
                                    <FontAwesomeIcon className="iconAllRecipePage" icon={faClock} size={"2xl"}/>
                                    <p>{recipe.recipe.totalTime}min</p>
                                </div>
                                <div>
                                    <FontAwesomeIcon className="iconAllRecipePage" icon={faFireFlameCurved} size={"2xl"} />
                                    <p>{Math.round(recipe.recipe.calories)}kCal</p>
                                </div>
                            </section>


                            <ul className='recipePageAllergens'>
                                {recipe.recipe.healthLabels.map((allergen) => (
                                    <li key={recipe.recipe.uri.split('_')[1]}>{allergen}</li>
                                ))}
                            </ul>
                            <div className="allergenList">
                                {handleAllergens(recipe)}

                            </div>


                        </li>
                        </NavLink>
                    ))}
                </ul>
            </section>



        </>
    )
}

export default AllRecipes