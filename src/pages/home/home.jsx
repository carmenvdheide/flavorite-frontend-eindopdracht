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
            <section className='left-side'>
                <h1>flavorite</h1>




                <section className="random-recipes-home">
                    {data && data.slice(0, 3).map((recipe) => {
                        return (
                            <RecipeCard
                                recipe={recipe}
                                key={recipe.recipe.uri.split('_')[1]}
                                classname="recipe-card"
                                classnameText="recipe-card-text"
                                classnameIcons="recipe-card-info"
                                classnameAllergens="recipe-card-allergens"
                                classnameNavLink="recipe-link"
                                navlink="home"
                                backButton="/random"

                            />
                        )
                    })}
                </section>




            </section>

            <div className='right-side'>
                <section className='categories-home'>
                <div className="surprise">
                    <p>Not sure what you want to cook? Click the button and we'll decide for you</p>
                    <button
                        className="surprise-button"
                        onClick={() => {
                            navigate("/random")
                        }}>
                        surprise me

                    </button>
                </div>


                    <div className="explore">
                        <p>Or would you rather browse through all recipes? </p>

                        {/*<img src={line} alt="line"/>*/}
                        <button
                            className='explore-button'
                            onClick={() => {
                                navigate("/recipes")
                            }}>
                            explore
                        </button>
                        {/*<img src={line}/>*/}

                    </div>

                </section>


                    <div className='home-info'>
                        <p>2M+ recipes</p>
                        <p>40+ diets/allergens</p>
                        <p>500+ nutrients</p>
                    </div>


            </div>

        </main>

    )
}

export default Home