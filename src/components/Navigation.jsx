import React from 'react';
import PropTypes from 'prop-types';
import {
  Flex, Heading, Link as ChakraLink, Button,
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { LoadingBar } from 'react-redux-loading-bar';
import { Link as RouterLink } from 'react-router-dom';

function Navigation({ logout }) {
  const headerStyles = {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '5rem',
    backgroundColor: 'white',
    width: '100%',
    position: 'fixed',
    top: 0,
    zIndex: 200,
    paddingX: '7px',
  };

  const loadingBarStyles = {
    backgroundColor: '#FF0000',
    height: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 300,
  };

  return (
    <Flex as="header" style={headerStyles}>
      <LoadingBar style={loadingBarStyles} />

      <Heading as="h1" fontSize="3xl" marginLeft="2px">
        <ChakraLink as={RouterLink} to="/" color="black">
          ThreadSpace-App
        </ChakraLink>
      </Heading>

      <Flex alignItems="center">
        <Button
          leftIcon={<AiOutlineLogout />}
          colorScheme="red"
          variant="solid"
          onClick={logout}
          marginRight="65px"
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navigation;
