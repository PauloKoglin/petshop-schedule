import './styles.css'
import Header from './components/header'
import Calendar from './components/calendar';

import { ChakraProvider, Flex } from '@chakra-ui/react'
import { localizer } from '../../../main/config';

const Main = () => {
  return (    
    <ChakraProvider>
        <Flex className='main-container'>
            <Header />
            <Calendar localizer={localizer}/>
        </Flex>
    </ChakraProvider>
  )
}

export default Main