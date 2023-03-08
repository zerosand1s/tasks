import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <ChakraProvider>
        <AuthProvider />
      </ChakraProvider>
    </>
  );
}

export default App;
