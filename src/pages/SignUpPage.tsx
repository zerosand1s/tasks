import {
  Box,
  Center,
  Heading,
  HStack,
  Link,
  Text,
  VStack
} from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { auth } from 'firebaseConfig';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile
} from 'react-firebase-hooks/auth';
import { Link as RouterLink } from 'react-router-dom';
import { SignUpValues } from 'types';

const SignUpPage = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
  const toast = useToast();
  const initialValues: SignUpValues = {
    name: '',
    email: '',
    password: ''
  };
  const signUpForm = useFormik({
    initialValues,
    onSubmit: async (values: SignUpValues) => {
      await createUserWithEmailAndPassword(values.email, values.password);
      if (user) {
        toast({
          title: 'Account created',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        await updateProfile({ displayName: values.name });
      }
    }
  });

  useEffect(() => {
    if (error || updateProfileError)
      toast({
        title:
          error?.message ||
          updateProfileError?.message ||
          'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
  }, [toast, error, updateProfileError]);

  return (
    <>
      <Center w="100%" h="100vh" bgColor="blackAlpha.100">
        <VStack spacing={3}>
          <Heading size="sm">Sign up with Tasks</Heading>
          <Box
            p={8}
            border="1px"
            borderColor="gray.300"
            borderRadius={10}
            boxShadow="md"
            bgColor="whiteAlpha.800"
          >
            <Box w={300}>
              <form onSubmit={signUpForm.handleSubmit}>
                <VStack spacing={5}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={signUpForm.values.name}
                      placeholder="Name"
                      onChange={signUpForm.handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={signUpForm.values.email}
                      placeholder="Email"
                      onChange={signUpForm.handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      value={signUpForm.values.password}
                      placeholder="Password"
                      onChange={signUpForm.handleChange}
                    />
                  </FormControl>
                  <Button
                    w="100%"
                    isLoading={loading || updating}
                    type="submit"
                    colorScheme="green"
                  >
                    Sign up
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>
          <HStack spacing={1}>
            <Text fontSize="xs">Already have an account?</Text>
            <Link as={RouterLink} to="/sign-in">
              <Text fontSize="xs" color="blue">
                Sign in
              </Text>
            </Link>
          </HStack>
        </VStack>
      </Center>
    </>
  );
};

export default SignUpPage;
