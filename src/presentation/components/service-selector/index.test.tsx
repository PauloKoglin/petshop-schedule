import ServiceSelector, { Option } from '.'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { FaCut, FaShower } from 'react-icons/fa'

describe('service-selector', () => {
    const options: Option[] = [
        { id: '1', displayName: 'Shower', icon: FaShower },
        { id: '2', displayName: 'Shear' , icon: FaCut },
    ]

    it('should render options given in the props', () => {
        render(
            <ServiceSelector options={options}/>
        )

        expect(screen.getByText('Shower')).toBeInTheDocument()
        expect(screen.getByText('Shear')).toBeInTheDocument()
    })

    it('should return selected services when option is clicked', () => {
        const onSelectionChanged = jest.fn()
        render(
            <ServiceSelector 
                options={options}
                onSelectionChanged={onSelectionChanged}/>
        )

        fireEvent.click(screen.getByText('Shower'))

        expect(onSelectionChanged).toBeCalledTimes(1)
        expect(onSelectionChanged).toBeCalledWith([{...options[0], selected: true}])
    })

    it('should return empty when option is unselected', () => {
        const optionsWithSelectedItem: Option[] = [
            { id: '1', displayName: 'Shower', icon: FaShower, selected: true },
            { id: '2', displayName: 'Shear' , icon: FaCut },
        ]
        const onSelectionChanged = jest.fn()
        render(
            <ServiceSelector 
                options={optionsWithSelectedItem}
                onSelectionChanged={onSelectionChanged}/>
        )

        fireEvent.click(screen.getByText('Shower'))

        expect(onSelectionChanged).toBeCalledTimes(1)
        expect(onSelectionChanged).toBeCalledWith([])
    })

})