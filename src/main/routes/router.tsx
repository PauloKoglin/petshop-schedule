import Main from "../../presentation/pages/main/index"
import { localizer } from "../config"
import { makeLoadSchedule } from "../factories"

import { BrowserRouter } from "react-router-dom"
import React from "react"

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Main 
                calendarLocalizer={localizer}
                loadSchedule={makeLoadSchedule()}
            />
        </BrowserRouter>
    )
}

export default Router