import './styles.css'
import Header from './components/header'
import Calendar from './components/calendar';
import { LoadSchedule, SaveSchedule } from '../../../domain/use-cases';

import { ChakraProvider, Flex } from '@chakra-ui/react'
import { DateLocalizer } from 'react-big-calendar';

type MainProps = {
  calendarLocalizer: DateLocalizer,
  loadSchedule: LoadSchedule,
  saveSchedule: SaveSchedule
}

const Main: React.FC<MainProps> = ({
    calendarLocalizer, 
    loadSchedule,
    saveSchedule}: MainProps) => {

    return (    
        <ChakraProvider>
            <Flex className='main-container'>
                <Header />
                <Calendar 
                    localizer={calendarLocalizer}
                    loadSchedule={loadSchedule}
                    saveSchedule={saveSchedule}
                />
            </Flex>
        </ChakraProvider>
  )
}

export default Main