import alcoholFree from "../../assets/alcoholfree.png";
import celeryFree from "../../assets/celeryfree.png";
import crustceanFree from "../../assets/crustceanfree.png";
import dairyFree from "../../assets/dairyfree.png";
import eggFree from "../../assets/eggfree.png";
import fishFree from "../../assets/fishfree.png";
import glutenFree from "../../assets/glutenfree.png";
import lupinFree from "../../assets/lupinfree.png";
import molluscFree from "../../assets/molluscfree.png";
import mustardFree from "../../assets/mustardfree.png";
import peanutFree from "../../assets/peanutfree.png";
import sesameFree from "../../assets/sesamefree.png";
import soyFree from "../../assets/soyfree.png";
import sulfiteFree from "../../assets/sulfitefree.png";
import treeNutFree from "../../assets/treenutfree.png";
import './handleAllergens.css'


function HandleAllergens(data) {


    return (

        <>
            {data.recipe.healthLabels.includes("Alcohol-Free") &&
                <div className="wrap">
                    <img src={alcoholFree} className="allergenIcon" alt="alcohol free" aria-describedby="alcoholFree"/>
                    <p role="tooltip" id="alcoholFree">Alcohol-free</p>
                </div>
            }


            {data.recipe.healthLabels.includes("Celery-Free") &&
                <div className="wrap">
                    <img src={celeryFree} className="allergenIcon" alt="celery free" aria-describedby="celeryFree"/>
                    <p role="tooltip" id="celeryFree">Celery-free</p>
                </div>
            }


            {data.recipe.healthLabels.includes("Crustcean-Free") &&
                <div className="wrap">
                    <img src={crustceanFree} className="allergenIcon"alt="crustcean free" aria-describedby="crustceanFree"/>
                    <p role="tooltip" id="crustceanFree">Crustcean-free</p>
                </div>
            }


            {data.recipe.healthLabels.includes("Dairy-Free") &&
                <div className="wrap">
                    <img src={dairyFree} className="allergenIcon" alt="dairy free" aria-describedby="dairyFree"/>
                    <p role="tooltip" id="dairyFree">Dairy-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Egg-Free") &&
                <div className="wrap">
                    <img src={eggFree} className="allergenIcon" alt="eggg free" aria-describedby="eggFree"/>
                    <p role="tooltip" id="eggFree">Egg-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Fish-Free") &&
                <div className="wrap">
                    <img src={fishFree} className="allergenIcon" alt="fish free"
                    aria-describedby="fishFree"/>
                    <p role="tooltip" id="fishFree">Fish-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Gluten-Free") &&
                <div className="wrap">
                    <img src={glutenFree} className="allergenIcon" alt="gluten free"
                    aria-describedby="glutenFree"/>
                    <p role="tooltip" id="glutenFree">Gluten-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Lupine-Free") &&
                <div className="wrap">
                    <img src={lupinFree} className="allergenIcon" alt="lupine free"
                    aria-describedby="lupinFree"/>
                    <p role="tooltip" id="lupinFree">Lupin-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Mollusk-Free") &&
                <div className="wrap">
                    <img src={molluscFree} className="allergenIcon" alt="mollusc free"
                    aria-describedby="molluscFree"/>
                    <p role="tooltip" id="molluscFree">Mollusc-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Mustard-Free") &&
                <div className="wrap">
                    <img src={mustardFree} className="allergenIcon" alt="mustard free"
                    aria-describedby="mustardFree"/>
                    <p role="tooltip" id="mustardFree">Mustard-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Peanut-Free") &&
                <div className="wrap">
                    <img src={peanutFree} className="allergenIcon" alt="peanut free" aria-describedby="peanutFree"/>
                    <p role="tooltip" id="peanutFree">Peanut-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Sesame-Free") &&
                <div className="wrap">
                    <img src={sesameFree} className="allergenIcon" alt="sesame free"
                    aria-describedby="sesameFree"/>
                    <p role="tooltip" id="sesameFree">Sesame-free</p>
                </div>
            }

            {data.recipe.healthLabels.includes("Soy-Free") &&
                <div className="wrap">
                    <img src={soyFree} className="allergenIcon" alt="soy free" aria-describedby="soyFree"/>
                    <p role="tooltip"id="soyFree">Soy-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Sulfite-Free") &&
                <div className="wrap">
                    <img src={sulfiteFree} className="allergenIcon" alt="sulfite free"
                    aria-describedby="sulfiteFree"/>
                    <p role="tooltip" id="sulfiteFree">Sulfite-free</p>
                </div>

            }

            {data.recipe.healthLabels.includes("Tree-Nut-Free") &&
                <div className="wrap">
                    <img src={treeNutFree} className="allergenIcon" alt="tree nut free" aria-describedby="treeNutFree"/>
                    <p role="tooltip" id="treeNutFree">Tree-nut-free</p>
                </div>

            }

        </>
    )

}

export default HandleAllergens