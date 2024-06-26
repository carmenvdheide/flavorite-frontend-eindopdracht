import React, {useEffect, useState} from "react"
import './home.css'
import {useNavigate} from "react-router-dom";
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
        isLoading === "loading" ? <Loading/> :<main className="home-container">
            <section className='left-side'>
                <header>
                    <h1>Flavorite</h1>
                </header>




                <section className="random-recipes-home">
                    {data && data.slice(0, 6).map((recipe) => {
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
                                backButton="/"

                            />
                        )
                    })}
                </section>




            </section>

            <div className='right-side'>
                <section className='categories-home'>
                <div className="surprise">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p>Click the button and we'll decide what to cook</p>
                    <button
                        className="surprise-button"
                        onClick={() => {
                            navigate("/random")
                        }}
                        type="button">
                        surprise me

                    </button>
                </div>


                    <div className="explore">
                        <p>Rather browse through all recipes? </p>

                        <button
                            className='explore-button'
                            onClick={() => {
                                navigate("/recipes")
                            }}
                            type="button">
                            explore
                        </button>

                    </div>

                </section>



            </div>

        </main>

    )
}

export default Home