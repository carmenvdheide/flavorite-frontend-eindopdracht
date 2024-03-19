import React, {useEffect, useState} from "react"
import './home.css'
import {useNavigate} from "react-router-dom";
import line from "../../assets/thinline.jpeg"
import {fetchRecipes} from "../../helpers/apiFetch.js";
import Loading from "../../components/loading/loading.jsx";
import RecipeCard from "../../components/recipe-card/recipe-card.jsx";



function Home() {
    const navigate = useNavigate()
    const [ data, setData] = useState([])
    const [ isLoading, setIsLoading ] = useState('')


    async function fetchData() {
        try {
            setIsLoading('loading');
            await fetchRecipes({
                setIsLoading: setIsLoading,
                setData: setData
            });
            setIsLoading('done');
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setIsLoading('done');
        }
    }

    useEffect(() => {
         void fetchData()
    }, []);

    useEffect(() => {
    }, [data]);

    return (
        isLoading === "loading" ? <Loading/> :<main>
            <section className='leftSide'>
                <h1>flavorite</h1>
                <div className="explore">
                    <img src={line} alt="line"/>
                    <button
                        className='exploreButton'
                        onClick={() => {
                            navigate("/recipes")
                        }}>
                        explore
                    </button>
                    <img src={line}/>

                </div>



                <section className="random-recipes-home">
                    {data && data.slice(0, 3).map((recipe) => {
                        return (
                            <RecipeCard
                                recipe={recipe}
                                key={recipe.recipe.uri.split('_')[1]}
                                classname="recipeCard"
                                classnameText="recipeCardText"
                                classnameIcons="recipeCardInfo"
                                classnameAllergens="recipeCardAllergens"
                                classnameNavLink="recipe-link"
                                navlink="home"
                                backButton="/random"

                            />
                        )
                    })}
                </section>




            </section>

            <div className='rightSide'>
                <section className='categoriesHome'>

                </section>
                <section className='homeRightDown'>
                    <div className='buttonContainer'>
                        <button
                            className="surpriseButton"
                            onClick={() => {
                                navigate("/random")
                            }}>
                            surprise me
                        </button>
                    </div>

                    <div className='homeInfo'>
                        <p>2M+ recipes</p>
                        <p>40+ diets/allergens</p>
                        <p>500+ nutrients</p>
                    </div>
                </section>

            </div>

        </main>

    )
}

export default Home