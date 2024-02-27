import React from "react"
import "./Filters.css"

function Filters({label, isChecked, checkHandler}) {
    return (
        <div className="checkboxWrap">
            <input
                type="checkbox"
                id={`${label}Filter`}
                checked={isChecked}
                onChange={checkHandler}
            />
            <label
                htmlFor={`${label}Filter`}
            >{label}</label>
        </div>
    )
}

export default Filters