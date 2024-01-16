import './home.css'
import {useNavigate} from "react-router-dom";
import line from "../../assets/thinline.jpeg"

function Home() {
    const navigate = useNavigate()

    return (
        <>
            <main>
                <section className='leftSide'>
                    <h1>flavorite</h1>
                    <div className="explore">
                        <img src={line}/>
                        <button
                            className='exploreButton'
                            onClick={() => {navigate("/recipes")}}>
                            explore
                        </button>
                        <img src={line}/>
                    </div>
                </section>

                <div className='rightSide'>
                    <section className='categoriesHome'>

                    </section>
                    <section className='homeRightDown'>
                        <div className='buttonContainer'>
                            <button
                                className="surpriseButton"
                                onClick={() => {navigate("/random")}}>
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

        </>
    )
}

export default Home