import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClickSignUp = () => {
    navigate('/sign-up');
  };

  const handleClickSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <Box h="100vh" bgColor="gray.200">
        <Box px={20} py={5}>
          <Grid
            templateAreas={`"header"
            "main"`}
            gridTemplateRows="50px 1fr"
            gap={2}
          >
            <GridItem area="header">
              <Flex alignItems="center">
                <Heading textColor="blue.500">Tasks</Heading>
                <Spacer />
                <ButtonGroup gap={3}>
                  <Button
                    variant="ghost"
                    colorScheme="green"
                    onClick={handleClickSignIn}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="outline"
                    colorScheme="green"
                    onClick={handleClickSignUp}
                  >
                    Sign up
                  </Button>
                </ButtonGroup>
              </Flex>
            </GridItem>
            <GridItem pt={24} pl={14} area="main">
              <VStack alignItems="flex-start" spacing={5}>
                <Heading as="h1" size="3xl">
                  Welcome to Tasks
                </Heading>
                <Text fontSize="2xl">
                  Add and keep track of tasks that are important to you
                </Text>
              </VStack>
              <Box mt={10}>
                <Button colorScheme="green" onClick={handleClickSignUp}>
                  Sign up for Tasks
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
