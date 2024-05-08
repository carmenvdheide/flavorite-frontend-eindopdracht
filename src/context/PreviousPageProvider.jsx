import React, {createContext, useEffect, useState} from "react"


export const PreviousPageContext = createContext(null)

function PreviousPageProvider({children}) {

    const [previousPage, setPreviousPage] = useState('')

    function setPreviousPageState(page) {
        setPreviousPage(page)
    }

    const contextData = {
        setPreviousPageState: setPreviousPageState,
        previousPage: previousPage,

    }


    return (
        <PreviousPageContext.Provider value={contextData}>
            {children}
        </PreviousPageContext.Provider>
    )
}

export default PreviousPageProvider