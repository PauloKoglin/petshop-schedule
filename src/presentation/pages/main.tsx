import { ChakraProvider } from '@chakra-ui/react'

const Main = () => {
  return (
    <div className="Main">
      <ChakraProvider>
        <h1>App Running :)</h1>
      </ChakraProvider>
    </div>
  );
}

export default Main