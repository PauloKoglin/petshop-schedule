import { render, screen } from '@testing-library/react'
import Main from './main'

describe('Main', () => {

  it('should render menu', () => {
    render(<Main />)
    expect(screen.getByText('App Running :)')).toBeInTheDocument()
  })
})
