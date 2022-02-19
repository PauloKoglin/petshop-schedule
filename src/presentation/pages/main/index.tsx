import './styles.css'
import Header from './components/header'
import Calendar from './components/calendar';
import { LoadSchedule } from '../../../domain/use-cases';

import { ChakraProvider, Flex } from '@chakra-ui/react'
import { DateLocalizer } from 'react-big-calendar';

type MainProps = {
  calendarLocalizer: DateLocalizer,
  loadSchedule: LoadSchedule
}

const Main: React.FC<MainProps> = ({calendarLocalizer, loadSchedule}: MainProps) => {
  return (    
    <ChakraProvider>
        <Flex className='main-container'>
            <Header />
            <Calendar 
                localizer={calendarLocalizer}
                loadSchedule={loadSchedule}
            />
        </Flex>
    </ChakraProvider>
  )
}

export default Main