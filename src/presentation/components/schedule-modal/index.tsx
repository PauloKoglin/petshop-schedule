import { formatDate, formatTime, setTimeStringToDate } from '../../utils'
import { Schedule } from '../../../domain/models/schedule'
import { SaveSchedule } from '../../../domain/use-cases'

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

type ScheduleModalProps = {
    defaultDate: Date,
    defaultStartTime: number,
    defaultEndTime: number
    schedule?: Schedule,
    onScheduleSaved: () => void
    onScheduleClose: () => void
    saveSchedule: SaveSchedule
}

type ScheduleState = {
    name: string,
    owner: string,
    date: Date,
    startTime: number,
    endTime: number
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ 
    defaultDate, 
    defaultStartTime, 
    defaultEndTime, 
    schedule, 
    onScheduleSaved, 
    onScheduleClose,
    saveSchedule }: ScheduleModalProps) => {

    const [visible, setVisible] = useState<boolean>(true)
    const [state, setState] = useState<ScheduleState>({
        name: schedule ? schedule.petName : '',
        owner: schedule ? schedule.ownerName : '',
        date: schedule ? schedule.startDate : defaultDate,
        startTime: schedule ? schedule.startDate.getTime() : defaultStartTime,
        endTime: schedule ? schedule.endDate.getTime() : defaultEndTime,
    })

    const onCloseModal = () => {
        setVisible(false)
        onScheduleClose()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const startDate: Date = new Date(state.date)
        const endDate: Date = new Date(state.date)
        startDate.setTime(state.startTime)
        endDate.setTime(state.endTime)

        saveSchedule
            .perform({
                petName: state.name,
                ownerName: state.owner,
                startDate,
                endDate,
                services: []
            })
            .then(() => {
                setVisible(false)
                onScheduleSaved()
            })
    }

    const handleTextInputChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [field]: event.target.value
        })
    }

    const handleTimeInputChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [field]: setTimeStringToDate(state.date, event.target.value)
        })
    }

    const handleDateInputChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [field]: new Date(event.target.value)
        })
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
                            <Input 
                                id='pet-name' 
                                defaultValue={state.name.toString()} 
                                value={state.name}
                                type='text'
                                onChange={event => handleTextInputChange('name', event)}
                            ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='owner-name'>Owner</FormLabel>
                            <Input 
                                id='owner-name' 
                                defaultValue={state.owner.toString()} 
                                value={state.owner}
                                type='text'
                                onChange={event => handleTextInputChange('owner', event)}
                            />
                        </FormControl>                    
                        <FormControl>
                            <FormLabel htmlFor='date'>Date</FormLabel>
                            <Input 
                                id='schedule-date' 
                                defaultValue={formatDate(state.date)} 
                                value={formatDate(state.date)}
                                type='date'
                                onChange={event => handleDateInputChange('date', event)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='startTime'>Starts</FormLabel>
                            <Input
                                id='schedule-startTime' 
                                defaultValue={formatTime(state.startTime)}
                                type='time'
                                onChange={event => handleTimeInputChange('startTime', event)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='endTime'>Ends</FormLabel>
                            <Input
                                id='schedule-endTime' 
                                defaultValue={formatTime(state.endTime)}
                                type='time'onChange={event => handleTimeInputChange('endTime', event)}
                            />
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