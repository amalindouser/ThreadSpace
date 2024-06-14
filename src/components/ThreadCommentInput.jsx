import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, Heading, Textarea, useToast,
} from '@chakra-ui/react';

function ThreadCommentInput({ submitCommentItem }) {
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmission = () => {
    if (typeof submitCommentItem === 'function') {
      submitCommentItem(content);
      setContent('');
      toast({
        title: 'Comment submitted.',
        description: 'Your comment has been submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      console.error('Error: The "submitCommentItem" prop must be a function.');
    }
  };

  return (
    <Box
      border="1px solid #E0E0E0"
      borderRadius="md"
      p={4}
      bg="white"
      maxW="600px"
      mx="auto"
      mt={4}
      boxShadow="md"
    >
      <Heading as="h3" size="lg" mb={4} color="#1D566E" fontFamily="Montserrat">
        Write Your Comment
      </Heading>
      <Textarea
        placeholder="Type your comment here..."
        value={content}
        onChange={handleInputChange}
        mb={4}
        fontFamily="Montserrat"
        borderColor="gray.300"
        _hover={{ borderColor: 'gray.400' }}
        _focus={{ borderColor: '#1D566E' }}
      />
      <Button
        colorScheme="teal"
        onClick={handleSubmission}
        fontFamily="Montserrat"
      >
        Submit
      </Button>
    </Box>
  );
}

ThreadCommentInput.propTypes = {
  submitCommentItem: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
