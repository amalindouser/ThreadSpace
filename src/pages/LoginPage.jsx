import {
  Box, Flex, Heading, Link as ChakraLink, Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import HeaderWithNavigation from '../components/Navigation';
import LoginInput from '../components/LoginInput';
import { asyncPreloadProcess } from '../states/isPreload/action';
import { asyncSetAuthUser } from '../states/authUser/action';

function Login() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const signOut = () => console.log('Signing out...');

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <Flex
      as="section"
      w="full"
      align="center"
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="#1D566E" // change to #1D566E
    >
      <HeaderWithNavigation signOut={signOut} showHamburger={false} />
      <Box
        w="full"
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Heading fontSize="2xl" mb={4} textAlign="center">
          Login
        </Heading>
        <LoginInput login={onLogin} />
        <Text mt={4} textAlign="center">
          <ChakraLink as={Link} to="/register" color="teal.500">
            Register
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
