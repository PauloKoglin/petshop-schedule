import { ChakraProvider } from '@chakra-ui/react'

import Header from '../../components/header'
import Calendar from './components/calendar';

const Main = () => {
  return (    
    <ChakraProvider>
        <Header/>
        <Calendar/>
    </ChakraProvider>
  )
}

export default Main