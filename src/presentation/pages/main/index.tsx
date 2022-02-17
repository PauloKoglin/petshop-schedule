import { ChakraProvider, Flex } from '@chakra-ui/react'

import Header from './components/header'
import Calendar from './components/calendar';
import './styles.css'

const Main = () => {
  return (    
    <ChakraProvider>
        <Flex className='main-container'>
            <Header/>
            <Calendar/>
        </Flex>
    </ChakraProvider>
  )
}

export default Main