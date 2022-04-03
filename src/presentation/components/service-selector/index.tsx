import { FC as ReactFC, useState } from 'react'
import { Box, Flex, HStack, Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'

const optionDefaultProps = {
    shadow: 'md',
    borderWidth:'1px',
    flex:'1',
    borderRadius:'md',
    padding:3,
    display:'flex',
    justifyContent:'center',
    cursor: 'pointer'
}

export type Option = {
    id: string
    displayName: string
    icon: IconType
    selected?: boolean
}

type ServiceSelectorProps = {
    options: Option[]
    onSelectionChanged?: (selectedOptions: Option[]) => void
}

type ServiceSelectorState = {
    options: Option[]
}

const ServiceSelector: ReactFC<ServiceSelectorProps> = ({ options, onSelectionChanged }: ServiceSelectorProps) => {

    options.length === 0 && console.warn('The ServiceSelector must have at least one option.')

    const [state, setState] = useState<ServiceSelectorState>({
        options: options.map(option => ({
            ...option,
            selected: option.selected === undefined ? false : option.selected
        }))
    })

    const handleOptionClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const selectedOptions: Option[] = state.options.map(option => ({
            ...option,
            selected: event.currentTarget.id === option.id ? !option.selected : option.selected
        }))
        setState({ options: selectedOptions })
        onSelectionChanged?.(selectedOptions.filter(option => option.selected))
    }

    const isOptionSelected = (id: string): boolean => {
        return state.options.some(option => option.id === id && option.selected)
    }

    const getOptions = () => {
        return state.options.map((option: Option) => (
            <Box
                {...optionDefaultProps}
                id={option.id}
                key={option.id}
                backgroundColor={isOptionSelected(option.id) ? '#3B19' : 'transparent'}
                onClick={event => handleOptionClick(event)}
                >
                <Flex direction={'column'}>
                    <Icon
                        as={option.icon as any}
                        alignSelf={'center'}
                        boxSize={10}
                        color={'darkorchid'}
                    />
                    <label style={{alignItems: "center"}}>{option.displayName}</label>
                </Flex>
            </Box>
        ))
    }

    return (
        <HStack spacing={[2, 4]} >
            {getOptions()}
        </HStack>
    )
}

export default ServiceSelector