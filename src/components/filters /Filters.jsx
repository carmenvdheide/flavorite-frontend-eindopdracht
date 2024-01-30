import {useState} from "react";
import "./Filters.css"
import handleAllergens from "../allergens/handleAllergens.jsx";

function Filters({createHealthParam}) {
    const [ allergenFilters, setAllergenFilters ] = useState([])

    const [classnameFiltersShow, setClassnameFiltersShow] = useState('dontShowFilters')

    function buttonClick() {
        {classnameFiltersShow === "dontShowFilters" ? setClassnameFiltersShow("showFilters") : setClassnameFiltersShow("dontShowFilters")}
    }

    let selectedAllergens = []


    function handleSelectAllergens(e) {
        const index = selectedAllergens.indexOf(e.target.value)
        {!selectedAllergens.includes(e.target.value) ? selectedAllergens.push(e.target.value) : selectedAllergens.splice(index, 1)}
        console.log(selectedAllergens)

        createHealthParam(selectedAllergens)


    }



    return (
        <div className="filterAllergens">
            <button
                onClick={buttonClick}
                className="buttonShowFilters"
            >Filters</button>
            <div className={classnameFiltersShow}>
                <input
                    type="checkbox"
                    id="dairyFilter"
                    value="dairy-free"
                    onClick={(e) => {handleSelectAllergens(e)}}
                />
                <label htmlFor="dairyFilter">Dairy-free</label>

                <input
                    type="checkbox"
                    id="glutenFilter"
                    value="gluten-free"
                    onClick={(e) => {handleSelectAllergens(e)}}

                />
                <label htmlFor="glutenFilter">Gluten-free</label>

                <input
                    type="checkbox"
                    id="celeryFilter"
                    value="celery-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="celeryFilter">Celery-free</label>

                <input
                    type="checkbox"
                    id="eggFilter"
                    value="egg-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="eggFilter">Egg-free</label>

                <input
                    type="checkbox"
                    id="soyFilter"
                    value="soy-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="soyFilter">Soy-free</label>

                <input
                    type="checkbox"
                    id="peanutFilter"
                    value="peanut-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="peanutFilter">Peanut-free</label>

                <input
                    type="checkbox"
                    id="fishFilter"
                    value="fish-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="fishFilter">Fish-free</label>

                <input
                    type="checkbox"
                    id="mustardFilter"
                    value="mustard-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="mustardFilter">Mustard-free</label>

                <input
                    type="checkbox"
                    id="sulfiteFilter"
                    value="sulfite-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="sulfiteFilter">Sulfite-free</label>

                <input
                    type="checkbox"
                    id="LupinFilter"
                    value="lupin-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="LupinFilter">Lupin-free</label>

                <input
                    type="checkbox"
                    id="sesameFilter"
                    value="sesame-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="sesameFilter">Sesame-free</label>

                <input
                    type="checkbox"
                    id="treeNutFilter"
                    value="tree-nut-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="treeNutFilter">Tree-nut-free</label>

                <input
                    type="checkbox"
                    id="alcoholFilter"
                    value="alcohol-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="alcoholFilter">Alcohol-free</label>

                <input
                    type="checkbox"
                    id="crustceanFilter"
                    value="crustcean-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="crustceanFilter">Crustcean-free</label>

                <input
                    type="checkbox"
                    id="molluscFilter"
                    value="mollusc-free"
                    onClick={(e) => {handleSelectAllergens(e)}}/>
                <label htmlFor="molluscFilter">Mollusc-free</label>

            </div>

        </div>

    )
}

export default Filters