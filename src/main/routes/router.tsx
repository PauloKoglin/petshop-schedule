import Main from "../../presentation/pages/main/index"
import { localizer } from "../config"
import { makeLoadSchedule } from "../factories"
import { makeSaveSchedule } from "../factories/save-schedule"

import { BrowserRouter } from "react-router-dom"
import React from "react"

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Main 
                calendarLocalizer={localizer}
                loadSchedule={makeLoadSchedule()}
                saveSchedule={makeSaveSchedule()}
            />
        </BrowserRouter>
    )
}

export default Router