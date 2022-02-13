import Main from "../../presentation/pages/main/index"

import { BrowserRouter } from "react-router-dom"
import React from "react"

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    )
}

export default Router