import { Avatar, Center, Flex, Heading, Spacer } from "@chakra-ui/react"

import './styles.css'

const Header: React.FC = () => {
    return (
        <Flex className="header-container">
            <Center height='100%' padding='6px' color='white'>
                <Heading size='lg'>Pet Scheduler</Heading>
            </Center>
            <Spacer/>
            <Center height='100%' padding='6px'>
                <Avatar  />
            </Center>
        </Flex>
    )
}

export default Header