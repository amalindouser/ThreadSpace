import React from 'react';
import {
  Flex, Heading, Link as ChakraLink, Text,
} from '@chakra-ui/react';
import Navigation from './Navigation';

const NotFoundThread = React.memo(() => {
  const redirectToHome = () => {
    console.log('Redirecting to home page...');
  };

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      h="100vh"
      textAlign="center"
      p={4}
      bg="gray.100"
    >
      <Heading fontSize="9xl" color="red.500" mb={4} mt={-20}>
        404
      </Heading>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Oops! The page you&apos;re looking for can&apos;t be found.
      </Text>
      <Text fontSize="lg" mb={8}>
        It seems you&apos;ve found yourself off the map. Don&apos;t worry,
        let&apos;s navigate back to the
        {' '}
        <ChakraLink as="button" onClick={redirectToHome} color="purple.500">
          home page
        </ChakraLink>
        {' '}
        and start over.
      </Text>
    </Flex>
  );
});

NotFoundThread.displayName = 'NotFoundThread';

export default function NotFoundPage() {
  const logout = () => console.log('Signing out...');

  return (
    <>
      <Navigation logout={logout} />
      <NotFoundThread />
    </>
  );
}
