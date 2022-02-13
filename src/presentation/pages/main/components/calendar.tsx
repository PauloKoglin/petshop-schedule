import { Center, Grid, GridItem } from '@chakra-ui/react'

const Calendar = () => {
    const Days: Number[] = [1,2,3,4,5,6,7]

    const getColumns = () => {
        let columns: JSX.Element[] = [];
        for (const day in Days) {
             columns.push((
             <GridItem h='80px' border='1px' borderColor='gray'>
                 <Center>{day}</Center>
            </GridItem>))
        }
        return columns
    }

    return (    
       <Grid templateColumns='repeat(7, 1fr)'>
            {getColumns()}
        </Grid>
    );
}

export default Calendar