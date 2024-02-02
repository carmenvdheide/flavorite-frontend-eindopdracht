function DietFilters({label, isChecked, checkHandler}) {
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
}

export default DietFilters