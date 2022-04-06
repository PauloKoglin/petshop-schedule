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

namespace ScheduleModalTypes {
    export type InputField<V> = {
        name: string,
        value: V,
        required?: boolean,
        valid?: boolean
    }

    export type Props = {
        defaultStartDate?: Date | undefined,
        defaultEndDate?: Date | undefined
        schedule?: Schedule | undefined,
        onScheduleSaved: () => void
        onScheduleClose: () => void
        saveSchedule: SaveSchedule
    }
}

const ScheduleModal: React.FC<ScheduleModalTypes.Props> = ({
    defaultStartDate, 
    defaultEndDate, 
    schedule, 
    onScheduleSaved, 
    onScheduleClose,
    saveSchedule }: ScheduleModalTypes.Props) => {

    const getTimeFromDate = (date: Date): number => {
        if (date.getHours() === 0 && date.getMinutes() === 0) {
            return new Date().getTime()
        } else {
            return date.getTime()
        }
    }

    const firstInputRef = useRef(null)
    const [visible, setVisible] = useState<boolean>(true)
    const [name, setName] = useState<ScheduleModalTypes.InputField<string>>({
        name: 'name',
        value: schedule?.petName ?? '',
        required: true
    })
    const [owner, setOwner] = useState<ScheduleModalTypes.InputField<string>>({
        name: 'owner',
        value: schedule?.ownerName ?? ''
    })
    const [date, setDate] = useState<ScheduleModalTypes.InputField<Date>>({
        name: 'date',
        value: schedule?.startDate ?? defaultStartDate ?? new Date(),
        required: true
    })
    const [startTime, setStartTime] = useState<ScheduleModalTypes.InputField<number>>({
        name: 'startTime',
        value: schedule?.startDate?.getTime() ?? getTimeFromDate(defaultStartDate ?? new Date()),
        required: true
    })
    const [endTime, setEndTime] = useState<ScheduleModalTypes.InputField<number>>({
        name: 'endTime',
        value: schedule?.endDate?.getTime() ?? getTimeFromDate(defaultEndDate ?? new Date()),
        required: true
    })  
    const [services, setServices] = useState<ScheduleModalTypes.InputField<ScheduleService[]>>({
        name: 'services',
        value: schedule?.services ?? [],
        required: true
    })

    const handleCloseModal = () => {
        setVisible(false)
        onScheduleClose()
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const startDate: Date = new Date(date.value)
        const endDate: Date = new Date(date.value)
        const newStartTime: Date = new Date(startTime.value)
        const newEndTime: Date = new Date(endTime.value)
        startDate.setHours(newStartTime.getHours())
        startDate.setMinutes(newStartTime.getMinutes())
        endDate.setHours(newEndTime.getHours())
        endDate.setMinutes(newEndTime.getMinutes())

        saveSchedule
            .perform({
                id: schedule?.id,
                petName: name.value,
                ownerName: owner.value,
                startDate,
                endDate,
                services: services.value
            })
            .then(() => {
                setVisible(false)
                onScheduleSaved()
            })
    }

    const handleServicesChange = (selectedServices: Option[]) => {
        setServices({
            ...services,
            value: selectedServices.map(option => option.displayName.toLowerCase() as ScheduleService)
        })
    }

    const options: Option[] = [
        { id: '1', displayName: 'Shower', icon: FaShower, selected: services.value.includes(ScheduleService.shower) },
        { id: '2', displayName: 'Shear' , icon: FaCut, selected: services.value.includes(ScheduleService.shear) },
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
                            <FormLabel htmlFor='schedule-modal-name'>Pet name</FormLabel>
                            <Input 
                                data-testid='schedule-modal-name'
                                id='schedule-modal-name'
                                ref={firstInputRef}
                                value={name.value}
                                type='text'
                                onChange={event => setName({...name, value: event.target.value})}
                            ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='owner-name'>Owner</FormLabel>
                            <Input 
                                id='owner-name'
                                value={owner.value}
                                type='text'
                                onChange={event => setOwner({ ...owner, value: event.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='date'>Date</FormLabel>
                            <Input 
                                id='schedule-date'
                                value={formatDate(date.value)}
                                type='date'
                                onChange={event => setDate({ ...date, value: new Date(event.target.value)})}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='startTime'>Starts</FormLabel>
                            <Input
                                id='schedule-startTime'
                                value={formatTime(startTime.value)}
                                type='time'
                                onChange={event => setStartTime({ ...startTime, value: setTimeStringToDate(date.value, event.target.value)})}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='endTime'>Ends</FormLabel>
                            <Input
                                id='schedule-endTime'
                                value={formatTime(endTime.value)}
                                type='time'
                                onChange={event => setEndTime({ ...endTime, value: setTimeStringToDate(date.value, event.target.value)})}
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