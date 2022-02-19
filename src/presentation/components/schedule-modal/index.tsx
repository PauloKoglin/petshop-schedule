import { formatDate, formatTime } from '../../utils'
import { Schedule } from '../../../domain/models/schedule'

import React, { useState } from 'react'
import { 
    Button, 
    Checkbox, 
    CheckboxGroup, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody,
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader,
    Stack} from '@chakra-ui/react'

type EventProps = {
    showing?: boolean;
    defaultDate: Date,
    schedule?: Schedule,
    onScheduleSaved: () => void
    onScheduleClose: () => void
}

type ScheduleState = {
    name: String,
    owner: String,
    date: Date,
    startTime: number,
    endTime: number
}

const ScheduleModal: React.FC<EventProps> = ({ showing, defaultDate, schedule, onScheduleSaved, onScheduleClose }: EventProps) => {
    const [visible, setVisible] = useState<boolean>(true)
    const [state] = useState<ScheduleState>({
        name: schedule ? schedule.petName : '',
        owner: schedule ? schedule.ownerName : '',
        date: schedule ? schedule.startDate : defaultDate,
        startTime: schedule ? schedule.startDate.getTime() : defaultDate.getTime(),
        endTime: schedule ? schedule.endDate.getTime() : defaultDate.getTime(),
    })

    const onCloseModal = () => {
        setVisible(false)
        onScheduleClose()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setVisible(false)
        onScheduleSaved()
    }

    return (    
        <Modal 
            isOpen={visible}
            closeOnEsc={true}
            onClose={() => onCloseModal()}>
            <ModalContent className='scheduler-modal'>
                <ModalHeader>Scheduler</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <CheckboxGroup colorScheme='purple' defaultValue={['Shower']}>
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                <Checkbox value='shower'>Shower</Checkbox>
                                <Checkbox value='shear'>Shear</Checkbox>
                            </Stack>
                        </CheckboxGroup>
                        <FormControl>
                            <FormLabel htmlFor='pet-name'>Pet name</FormLabel>
                            <Input id='pet-name' defaultValue={state.name.toString()} type='text'></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='owner-name'>Owner</FormLabel>
                            <Input id='owner-name' defaultValue={state.owner.toString()} type='text'></Input>
                        </FormControl>                    
                        <FormControl>
                            <FormLabel htmlFor='date'>Date</FormLabel>
                            <Input id='schedule-date' defaultValue={formatDate(state.date)} type='date'></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='startTime'>Starts</FormLabel>
                            <Input id='schedule-startTime' defaultValue={formatTime(state.startTime)} type='time'></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='endTime'>Ends</FormLabel>
                            <Input id='schedule-endTime' defaultValue={formatTime(state.endTime)} type='time'></Input>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={onCloseModal}>Cancel</Button>
                        <Button colorScheme='purple' mr={3} type='submit'>Save</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default ScheduleModal