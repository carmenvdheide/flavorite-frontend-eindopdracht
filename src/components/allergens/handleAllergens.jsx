import React from "react"
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
import {useState} from "react";


function HandleAllergens({data}) {
    const allergenArray = []
    const [size, setSize] = useState(7)
    const [classnameMoreButton, setClassnameMoreButton] = useState('allergen-button')
    const [classnameLessButton, setClassnameLessButton] = useState('dont-show-button')

    const [obj, setObj] = useState({
        "alcoholFree" : alcoholFree,
        "celeryFree" : celeryFree,
        "crustceanFree" : crustceanFree,
        "dairyFree" : dairyFree,
        "eggFree" : eggFree,
        "fishFree" : fishFree,
        "glutenFree" : glutenFree,
        "lupinFree" : lupinFree,
        "mulluskFree" : molluscFree,
        "mustardFree" : mustardFree,
        "peanutFree" : peanutFree,
        "sesameFree" : sesameFree,
        "soyFree" : soyFree,
        "sulfiteFree" : sulfiteFree,
        "treeNutFree" : treeNutFree
    })


    data.recipe.healthLabels.map((label) => {
        {label === "Alcohol-Free" && allergenArray.push("alcoholFree")}
        {label === "Celery-Free" && allergenArray.push("celeryFree")}
        {label === "Crustcean-Free" && allergenArray.push("crustCeanFree")}
        {label === "Dairy-Free" && allergenArray.push("dairyFree")}
        {label === "Egg-Free" && allergenArray.push("eggFree")}
        {label === "Fish-Free" && allergenArray.push("fishFree")}
        {label === "Gluten-Free" && allergenArray.push("glutenFree")}
        {label === "Lupine-Free" && allergenArray.push("lupinFree")}
        {label === "Mullusk-Free" && allergenArray.push("molluscFree")}
        {label === "Mustard-Free" && allergenArray.push("mustardFree")}
        {label === "Peanut-Free" && allergenArray.push("peanutFree")}
        {label === "Sesame-Free" && allergenArray.push("sesameFree")}
        {label === "Soy-Free" && allergenArray.push("soyFree")}
        {label === "Sulfite-Free" && allergenArray.push("sulfiteFree")}
        {label === "Tree-Nut-Free" && allergenArray.push("treeNutFree")}

    })
    function shortarray() {

       return (
           <>
               {data.recipe.healthLabels.includes("Alcohol-Free") &&
                   <div className="wrap">
                       <img src={alcoholFree} className="allergen-icon" alt="alcohol free" aria-describedby="alcoholFree"/>
                       <p role="tooltip" id="alcoholFree">Alcohol-free</p>
                   </div>
               }


               {data.recipe.healthLabels.includes("Celery-Free") &&
                   <div className="wrap">
                       <img src={celeryFree} className="allergen-icon" alt="celery free" aria-describedby="celeryFree"/>
                       <p role="tooltip" id="celeryFree">Celery-free</p>
                   </div>
               }


               {data.recipe.healthLabels.includes("Crustcean-Free") &&
                   <div className="wrap">
                       <img src={crustceanFree} className="allergen-icon"alt="crustcean free" aria-describedby="crustceanFree"/>
                       <p role="tooltip" id="crustceanFree">Crustcean-free</p>
                   </div>
               }


               {data.recipe.healthLabels.includes("Dairy-Free") &&
                   <div className="wrap">
                       <img src={dairyFree} className="allergen-icon" alt="dairy free" aria-describedby="dairyFree"/>
                       <p role="tooltip" id="dairyFree">Dairy-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Egg-Free") &&
                   <div className="wrap">
                       <img src={eggFree} className="allergen-icon" alt="eggg free" aria-describedby="eggFree"/>
                       <p role="tooltip" id="eggFree">Egg-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Fish-Free") &&
                   <div className="wrap">
                       <img src={fishFree} className="allergen-icon" alt="fish free"
                            aria-describedby="fishFree"/>
                       <p role="tooltip" id="fishFree">Fish-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Gluten-Free") &&
                   <div className="wrap">
                       <img src={glutenFree} className="allergen-icon" alt="gluten free"
                            aria-describedby="glutenFree"/>
                       <p role="tooltip" id="glutenFree">Gluten-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Lupine-Free") &&
                   <div className="wrap">
                       <img src={lupinFree} className="allergen-icon" alt="lupine free"
                            aria-describedby="lupinFree"/>
                       <p role="tooltip" id="lupinFree">Lupin-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Mollusk-Free") &&
                   <div className="wrap">
                       <img src={molluscFree} className="allergen-icon" alt="mollusc free"
                            aria-describedby="molluscFree"/>
                       <p role="tooltip" id="molluscFree">Mollusc-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Mustard-Free") &&
                   <div className="wrap">
                       <img src={mustardFree} className="allergen-icon" alt="mustard free"
                            aria-describedby="mustardFree"/>
                       <p role="tooltip" id="mustardFree">Mustard-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Peanut-Free") &&
                   <div className="wrap">
                       <img src={peanutFree} className="allergen-icon" alt="peanut free" aria-describedby="peanutFree"/>
                       <p role="tooltip" id="peanutFree">Peanut-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Sesame-Free") &&
                   <div className="wrap">
                       <img src={sesameFree} className="allergen-icon" alt="sesame free"
                            aria-describedby="sesameFree"/>
                       <p role="tooltip" id="sesameFree">Sesame-free</p>
                   </div>
               }

               {data.recipe.healthLabels.includes("Soy-Free") &&
                   <div className="wrap">
                       <img src={soyFree} className="allergen-icon" alt="soy free" aria-describedby="soyFree"/>
                       <p role="tooltip"id="soyFree">Soy-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Sulfite-Free") &&
                   <div className="wrap">
                       <img src={sulfiteFree} className="allergen-icon" alt="sulfite free"
                            aria-describedby="sulfiteFree"/>
                       <p role="tooltip" id="sulfiteFree">Sulfite-free</p>
                   </div>

               }

               {data.recipe.healthLabels.includes("Tree-Nut-Free") &&
                   <div className="wrap">
                       <img src={treeNutFree} className="allergen-icon" alt="tree nut free" aria-describedby="treeNutFree"/>
                       <p role="tooltip" id="treeNutFree">Tree-nut-free</p>
                   </div>
               }

           </>
       )

    }

    function longArray() {



       return (
           <>
               {allergenArray.slice(0, size).map((allergen) => {
                   const firstSub = allergen.substring(0, allergen.length - 4)
                   const secondSub = allergen.substring(allergen.length-4, allergen.length).toLowerCase()

                   const tooltipText = `${firstSub[0].toUpperCase() + firstSub.slice(1)}-${secondSub}`

                   return (

                       <div key={allergen} className="wrap">
                           <img src={obj[allergen]} className="allergen-icon" alt={tooltipText} aria-describedby={allergen}/>
                           <p role="tooltip" id={allergen}>{tooltipText}</p>
                       </div>

                       )

               })}

               <button
                   onClick={() => {
                       setSize(allergenArray.length)
                       setClassnameMoreButton("dont-show-button")
                       setClassnameLessButton("allergen-button")
                   }}
                   className={classnameMoreButton}
               >+</button>
               <button
                   onClick={() => {
                       setSize(6)
                       setClassnameMoreButton("allergen-button")
                       setClassnameLessButton("dont-show-button")
                   }}
                   className={classnameLessButton}
               >-</button>
           </>
       )
    }



    return (

        <>
            {allergenArray.length > 7 ? longArray() : shortarray()}
        </>



    )

    }

export default HandleAllergens