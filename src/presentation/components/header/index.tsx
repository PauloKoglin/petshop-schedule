import { Flex, Spacer } from "@chakra-ui/react"


const Header: React.FC = () => {
    return (
        <Flex w='100%' h='60px' backgroundColor={"GrayText"}>
            <Flex>
                <h1>Pet Scheduler</h1>
            </Flex>
            <Spacer/>
            <Flex>
                <h1>Options</h1>
            </Flex>
        </Flex>
    )
}

export default Header