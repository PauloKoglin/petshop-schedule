import { ChakraProvider } from '@chakra-ui/react'

import Header from './components/header'
import Calendar from './components/calendar';
import './styles.css'

const Main = () => {
  return (    
    <ChakraProvider>
        <div className='container'>
            <Header/>
            <Calendar/>
        </div>
    </ChakraProvider>
  )
}

export default Main