import React from "react"
import "./button.css"

function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={props.className}
            value={props.value}>
            {props.text}
        </button>
    )
}

export default Button