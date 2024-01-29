import {useState} from "react";
import "./Filters.css"

function Filters() {
    const [ filters, setFilters ] = useState({
        allergens: [],
        cookingTime: '',
    })

    const [classnameFiltersShow, setClassnameFiltersShow] = useState('dontShowFilters')

    function buttonClick() {
        {classnameFiltersShow === "dontShowFilters" ? setClassnameFiltersShow("showFilters") : setClassnameFiltersShow("dontShowFilters")}
    }


    return (
        <div className="filterAllergens">
            <button
                onClick={buttonClick}
                className="buttonShowFilters"
            >Filters</button>
            <div className={classnameFiltersShow}>
                <input type="checkbox" id="dairyFilter"/>
                <label htmlFor="dairyFilter">Dairy-free</label>

                <input type="checkbox" id="glutenFilter"/>
                <label htmlFor="glutenFilter">Gluten-free</label>

                <input type="checkbox" id="celeryFilter"/>
                <label htmlFor="celeryFilter">Celery-free</label>

                <input type="checkbox" id="eggFilter"/>
                <label htmlFor="eggFilter">Egg-free</label>

                <input type="checkbox" id="soyFilter"/>
                <label htmlFor="soyFilter">Soy-free</label>

                <input type="checkbox" id="peanutFilter"/>
                <label htmlFor="peanutFilter">Peanut-free</label>

                <input type="checkbox" id="fishFilter"/>
                <label htmlFor="fishFilter">Fish-free</label>

                <input type="checkbox" id="mustardFilter"/>
                <label htmlFor="mustardFilter">Mustard-free</label>

                <input type="checkbox" id="sulfiteFilter"/>
                <label htmlFor="sulfiteFilter">Sulfite-free</label>

                <input type="checkbox" id="LupinFilter"/>
                <label htmlFor="LupinFilter">Lupin-free</label>

                <input type="checkbox" id="sesameFilter"/>
                <label htmlFor="sesameFilter">Sesame-free</label>

                <input type="checkbox" id="treeNutFilter"/>
                <label htmlFor="treeNutFilter">Tree-nut-free</label>

                <input type="checkbox" id="alcoholFilter"/>
                <label htmlFor="alcoholFilter">Alcohol-free</label>

                <input type="checkbox" id="crustceanFilter"/>
                <label htmlFor="crustceanFilter">Crustcean-free</label>

                <input type="checkbox" id="molluscFilter"/>
                <label htmlFor="molluscFilter">Mollusc-free</label>

            </div>

        </div>

    )
}

export default Filters