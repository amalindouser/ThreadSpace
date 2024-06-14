import {
  Box, Flex, Heading, Link as ChakraLink, Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderWithNavigation from '../components/Navigation';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser, loading, error } = useSelector((state) => state.users);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onRegister = async ({ name, email, password }) => {
    setIsSubmitting(true);
    try {
      await dispatch(asyncRegisterUser({
        name, email, password, successCallback: () => navigate('/'),
      }));
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signOut = () => {
    // Add your sign out logic here
    console.log('User signed out');
  };

  if (loading || isSubmitting) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
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
          Create an account
        </Heading>
        <RegisterInput register={onRegister} />
        <Text mt={4} textAlign="center">
          Already have an account?
          {' '}
          <ChakraLink as={Link} to="/login" color="teal.500">
            Sign In
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
}

export default Register;
