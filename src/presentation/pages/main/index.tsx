import './styles.css'
import Header from './components/header'
import Calendar from './components/calendar';

import { ChakraProvider, Flex } from '@chakra-ui/react'

const Main = () => {
  return (    
    <ChakraProvider>
        <Flex className='main-container'>
            <Header />
            <Calendar />
        </Flex>
    </ChakraProvider>
  )
}

export default Main