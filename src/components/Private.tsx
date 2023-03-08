import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';

const Private = () => {
  const handleClickSignOut = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <>
      <Button onClick={handleClickSignOut}>Sign out</Button>
    </>
  );
};

export default Private;
