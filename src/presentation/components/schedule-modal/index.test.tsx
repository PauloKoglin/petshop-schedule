import ScheduleModal from "."
import { SaveSchedule } from "../../../domain/use-cases"

import { screen, render, fireEvent } from "@testing-library/react"
import { mock, MockProxy } from "jest-mock-extended"

const makeComponent = () => {
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
        render(makeComponent())

        const nameInput = screen.getByTestId('schedule-modal-name')

        expect(nameInput).toHaveFocus()
    })

    it('should be able to enter text into name input', () => {
        render(makeComponent())
        const nameInput = screen.getByTestId('schedule-modal-name')

        fireEvent.change(nameInput, {target: {value: 'any text'}})

        expect(nameInput).toHaveValue('any text')
    })

    it('should be able to enter text into owner input', () => {
        render(makeComponent())
        const nameInput = screen.getByTestId('schedule-modal-owner')

        fireEvent.change(nameInput, {target: {value: 'any text'}})

        expect(nameInput).toHaveValue('any text')
    })

    it('should be able to enter date into date input', () => {
        render(makeComponent())
        const nameInput = screen.getByTestId('schedule-modal-date')

        fireEvent.change(nameInput, {target: {value: '2022-04-06'}})

        expect(nameInput).toHaveValue('2022-04-06')
    })

    it('should be able to enter time into start-time input', () => {
        render(makeComponent())
        const nameInput = screen.getByTestId('schedule-modal-start-time')

        fireEvent.change(nameInput, {target: {value: '10:30'}})

        expect(nameInput).toHaveValue('10:30')
    })

    it('should be able to enter time into end-time input', () => {
        render(makeComponent())
        const nameInput = screen.getByTestId('schedule-modal-end-time')

        fireEvent.change(nameInput, {target: {value: '11:30'}})

        expect(nameInput).toHaveValue('11:30')
    })
})