import React from 'react'

export type Option = {
    id: string,
    displayName: string
}

type ServiceSelectorProps = {
    options: Option[]
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ options }) => {

    const getOptions = () => {
        return options.map((option: Option) => (<div key={option.id}>{option.displayName}</div>))
    }

    return (
        <div >
            {getOptions()}
        </div>
    )
}

export default ServiceSelector