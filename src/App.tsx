import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <h1>App Running :)</h1>
      </ChakraProvider>
    </div>
  );
}

export default App;
