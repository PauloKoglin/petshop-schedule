import ScheduleModal from "."
import { SaveSchedule } from "../../../domain/use-cases"

import { screen, render } from "@testing-library/react"
import { mock, MockProxy } from "jest-mock-extended"

const makeSut = () => {
    const onScheduleClose = jest.fn()
    const onScheduleSaved = jest.fn()
    const saveScheduleMock: MockProxy<SaveSchedule> = mock() 
    
    return (
        <ScheduleModal 
            onScheduleClose={onScheduleClose}
            onScheduleSaved={onScheduleSaved}
            saveSchedule={saveScheduleMock}
        />
    )
}

describe('<ScheduleModal />', () => {
    it('should set the cursor position to field name on show', () => {
        const sut = makeSut()
        render(sut)

        const nameInput = screen.getByTestId('name-input')

        expect(nameInput).toHaveFocus()
    })
})