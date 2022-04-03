import { formatDate, formatTime, setTimeStringToDate } from '../../utils'
import { Schedule } from '../../../domain/models/schedule'
import { ScheduleService } from '../../../domain/types/enums'
import { SaveSchedule } from '../../../domain/use-cases'
import ServiceSelector, { Option } from '../service-selector'

import React, { useRef, useState } from 'react'
import { FaCut, FaShower } from 'react-icons/fa'
import { 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody,
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader
} from '@chakra-ui/react'

type ScheduleModalProps = {
    defaultStartDate?: Date | undefined,
    defaultEndDate?: Date | undefined
    schedule?: Schedule | undefined,
    onScheduleSaved: () => void
    onScheduleClose: () => void
    saveSchedule: SaveSchedule
}

type ScheduleState = {
    id?: string,
    name: string,
    owner: string,
    date: Date,
    startTime: number,
    endTime: number,
    services: ScheduleService[]
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
    defaultStartDate, 
    defaultEndDate, 
    schedule, 
    onScheduleSaved, 
    onScheduleClose,
    saveSchedule }: ScheduleModalProps) => {

    const getTimeFromDate = (date: Date): number => {
        if (date.getHours() === 0 && date.getMinutes() === 0) {
            return new Date().getTime()
        } else {
            return date.getTime()
        }
    }

    const firstInputRef = useRef(null)
    const [visible, setVisible] = useState<boolean>(true)
    const [state, setState] = useState<ScheduleState>({
        id: schedule?.id,
        name: schedule?.petName ?? '',
        owner: schedule?.ownerName ?? '',
        date: schedule?.startDate ?? defaultStartDate ?? new Date(),
        startTime: schedule?.startDate?.getTime() ?? getTimeFromDate(defaultStartDate ?? new Date()),
        endTime: schedule?.endDate?.getTime() ?? getTimeFromDate(defaultEndDate ?? new Date()),
        services: schedule?.services ?? []
    })

    const handleCloseModal = () => {
        setVisible(false)
        onScheduleClose()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const startDate: Date = new Date(state.date)
        const endDate: Date = new Date(state.date)
        const startTime: Date = new Date(state.startTime)
        const endTime: Date = new Date(state.endTime)
        startDate.setHours(startTime.getHours())
        startDate.setMinutes(startTime.getMinutes())
        endDate.setHours(endTime.getHours())
        endDate.setMinutes(endTime.getMinutes())

        saveSchedule
            .perform({
                id: state.id,
                petName: state.name,
                ownerName: state.owner,
                startDate,
                endDate,
                services: state.services
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

    const handleServicesChange = (selectedServices: Option[]) => {
        setState({
            ...state,
            services: selectedServices.map(option => option.displayName.toLowerCase() as ScheduleService)
        })
    }

    const options: Option[] = [
        { id: '1', displayName: 'Shower', icon: FaShower, selected: state.services.includes(ScheduleService.shower) },
        { id: '2', displayName: 'Shear' , icon: FaCut, selected: state.services.includes(ScheduleService.shear) },
    ]

    return (
        <Modal
            isOpen={visible}
            isCentered
            closeOnEsc={true}
            onClose={() => handleCloseModal()}
            initialFocusRef={firstInputRef}>
            <ModalContent 
                className='scheduler-modal'
                boxShadow={'dark-lg'}>
                <ModalHeader>Scheduler</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <ServiceSelector 
                            options={options} 
                            onSelectionChanged={handleServicesChange}
                            />
                        <FormControl>
                            <FormLabel htmlFor='pet-name'>Pet name</FormLabel>
                            <Input 
                                ref={firstInputRef}
                                id='pet-name'
                                value={state.name}
                                type='text'
                                onChange={event => handleTextInputChange('name', event)}
                            ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='owner-name'>Owner</FormLabel>
                            <Input 
                                id='owner-name'
                                value={state.owner}
                                type='text'
                                onChange={event => handleTextInputChange('owner', event)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='date'>Date</FormLabel>
                            <Input 
                                id='schedule-date'
                                value={formatDate(state.date)}
                                type='date'
                                onChange={event => handleDateInputChange('date', event)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='startTime'>Starts</FormLabel>
                            <Input
                                id='schedule-startTime'
                                value={formatTime(state.startTime)}
                                type='time'
                                onChange={event => handleTimeInputChange('startTime', event)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='endTime'>Ends</FormLabel>
                            <Input
                                id='schedule-endTime'
                                value={formatTime(state.endTime)}
                                type='time'
                                onChange={event => handleTimeInputChange('endTime', event)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={handleCloseModal}>Cancel</Button>
                        <Button colorScheme='purple' mr={3} type='submit'>Save</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default ScheduleModal