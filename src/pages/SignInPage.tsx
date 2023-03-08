import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react';
import { auth } from 'firebaseConfig';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle
} from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import { Link as RouterLink } from 'react-router-dom';
import { SignInValues } from 'types';

const SignInPage = () => {
  const [
    signInWithEmailAndPassword,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _,
    signingIn,
    error
  ] = useSignInWithEmailAndPassword(auth);
  const [
    signInWithGoogle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __,
    signingInWithGoogle,
    signInWithGoogleError
  ] = useSignInWithGoogle(auth);
  const toast = useToast();
  const initialValues: SignInValues = {
    email: '',
    password: ''
  };
  const signInForm = useFormik({
    initialValues,
    onSubmit: async (values: SignInValues) =>
      signInWithEmailAndPassword(values.email, values.password)
  });

  useEffect(() => {
    if (error || signInWithGoogleError)
      toast({
        title:
          error?.message ||
          signInWithGoogleError?.message ||
          'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
  }, [toast, error, signInWithGoogleError]);

  return (
    <>
      <Center w="100%" h="100vh" bgColor="blackAlpha.100">
        <VStack spacing={3}>
          <Heading size="sm">Sign in to Tasks</Heading>
          <Box
            p={8}
            border="1px"
            borderColor="gray.300"
            borderRadius={10}
            boxShadow="md"
            bgColor="whiteAlpha.800"
          >
            <Box w={300}>
              <VStack spacing="8">
                <VStack w="100%" spacing={3}>
                  <Button
                    w="100%"
                    isLoading={signingIn || signingInWithGoogle}
                    variant="outline"
                    colorScheme="green"
                    onClick={() => signInWithGoogle()}
                  >
                    <HStack spacing="3">
                      <Icon as={FcGoogle} boxSize={6} />
                      <Text>Continue with Google</Text>
                    </HStack>
                  </Button>
                </VStack>
                <Box w="100%">
                  <form onSubmit={signInForm.handleSubmit}>
                    <VStack spacing={5}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          name="email"
                          value={signInForm.values.email}
                          placeholder="Email"
                          onChange={signInForm.handleChange}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          name="password"
                          value={signInForm.values.password}
                          placeholder="Password"
                          onChange={signInForm.handleChange}
                        />
                      </FormControl>
                      <Button
                        w="100%"
                        isLoading={signingIn || signingInWithGoogle}
                        type="submit"
                        colorScheme="green"
                      >
                        Sign in
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </VStack>
            </Box>
          </Box>
          <HStack spacing={1}>
            <Text fontSize="xs">Don't have an account?</Text>
            <Link as={RouterLink} to="/sign-up">
              <Text fontSize="xs" color="blue">
                Sign up
              </Text>
            </Link>
          </HStack>
        </VStack>
      </Center>
    </>
  );
};

export default SignInPage;
