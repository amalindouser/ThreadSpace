import React from 'react';
import {
  Box, Container, Heading, Flex,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AddThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

class ThreadCategory {
  constructor(category) {
    this.category = category;
  }

  createThread(dispatch, navigate, data) {
    dispatch(
      asyncAddThread({
        ...data,
        category: this.category,
        successCallback: () => navigate('/'),
      }),
    );
  }
}

function useThreadCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createThread = ({ title, body, category }) => {
    let categoryInstance;
    if (category === 'tech') {
      categoryInstance = new ThreadCategory(category);
    } else {
      categoryInstance = new ThreadCategory(category);
    }
    categoryInstance.createThread(dispatch, navigate, { title, body });
  };

  return createThread;
}

function AddThreadPage() {
  const createThread = useThreadCreation();

  return (
    <Flex
      as="main"
      w="100%"
      h="100vh"
      py="5rem"
      bg="#1D566E"
      justifyContent="center"
      alignItems="center"
      fontFamily="Montserrat"
    >
      <Container as="section" maxW="5xl" marginTop="9rem">
        <Box as="header" textAlign="center">
          {' '}
          {/* Menambahkan textAlign="center" */}
          <Heading as="h2" fontSize="3xl" color="white" mt="1rem" mb={6} fontFamily="Montserrat">
            Create a new discussion
          </Heading>
        </Box>
        <AddThreadInput addThread={createThread} />
      </Container>
    </Flex>
  );
}

export default AddThreadPage;
