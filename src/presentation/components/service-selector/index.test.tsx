import ServiceSelector, { Option } from '.'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('service-selector', () => {

    it('should render options given in the props', () => {
        const options: Option[] = [
            { id: '1', displayName: 'Shower' },
            { id: '2', displayName: 'Shear' },
        ]
        render(
            <ServiceSelector options={options}/>
        )

        expect(screen.getByText('Shower')).toBeInTheDocument()
        expect(screen.getByText('Shear')).toBeInTheDocument()
    })

})