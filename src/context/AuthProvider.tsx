import { Center, Spinner, Text } from '@chakra-ui/react';
import Private from 'components/Private';
import Public from 'components/Public';
import type { User } from 'firebase/auth';
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

type AuthContextType = User | null | undefined;

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = () => {
  const [user, loading, error] = useAuthState(auth);

  const render = () => {
    if (loading) {
      return (
        <Center h="100vh">
          <Spinner size="lg" />
        </Center>
      );
    }

    if (error) {
      return (
        <Center>
          <Text color="red">Oops!! Something went wrong</Text>
        </Center>
      );
    }

    return user ? <Private /> : <Public />;
  };

  return <AuthContext.Provider value={user}>{render()}</AuthContext.Provider>;
};
