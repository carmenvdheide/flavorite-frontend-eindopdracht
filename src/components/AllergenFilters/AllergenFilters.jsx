import {useState} from "react";
import "./AllergenFilters.css"
import handleAllergens from "../allergens/handleAllergens.jsx";

function AllergenFilters({label, index, isChecked, checkHandler}) {




    const [classnameFiltersShow, setClassnameFiltersShow] = useState('dontShowFilters')

    function buttonClick() {
        {classnameFiltersShow === "dontShowFilters" ? setClassnameFiltersShow("showFilters") : setClassnameFiltersShow("dontShowFilters")}
    }


    return (
        <div>
            <input
                type="checkbox"
                id={`${label}Filter`}
                checked={isChecked}
                onChange={checkHandler}
            />
            <label
                htmlFor={`${name}Filter`}
            >{label}</label>
        </div>

    )



        // <div className="filterAllergens">
        //     <button
        //         onClick={buttonClick}
        //         className="buttonShowFilters"
        //     >Filters</button>
        //     <div className={classnameFiltersShow}>





}

export default AllergenFilters