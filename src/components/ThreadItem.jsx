import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Icon, Tag, Text, useToast,
} from '@chakra-ui/react';
import { FaRegCommentAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import postedAt from '../utils/index';

const ThreadUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ThreadShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(ThreadUserShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVote,
  downVote,
  neutralizeVote,
  authUserId,
}) {
  const [voteStatus, setVoteStatus] = useState('neutral');
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const updateVoteStatus = () => {
      let status = 'neutral';
      if (upVotesBy.includes(authUserId)) {
        status = 'liked';
      } else if (downVotesBy.includes(authUserId)) {
        status = 'disliked';
      }
      setVoteStatus(status);
    };
    updateVoteStatus();
  }, [authUserId, downVotesBy, upVotesBy]);

  const handleVoteClick = async (event, voteType) => {
    event.stopPropagation();

    const performVote = async () => {
      if (voteStatus === voteType) {
        await neutralizeVote(id);
        setVoteStatus('neutral');
      } else {
        const voteAction = voteType === 'liked' ? upVote : downVote;
        await voteAction(id);
        setVoteStatus(voteType);
      }
    };

    try {
      await performVote();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Vote Failed.',
        description: error.message || 'An error occurred while processing your vote.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  return (
    <Card
      maxW="ms"
      mt="1rem"
      border="1px solid #E0E0E0"
      borderRadius="md"
      onClick={handleThreadClick}
      _hover={{ cursor: 'pointer', bg: '#EBEBEB' }}
    >
      <CardHeader as="header" bg="#FAFAFA" p={4} borderBottom="1px solid #E0E0E0">
        <Tag size="md" bg="white" color="#333333" variant="solid" borderRadius="box" px={2}>
          <Text fontSize="md" color="#1D566E" fontFamily="Montserrat">
            #
            {category}
          </Text>
        </Tag>
        <Heading color="#1D566E" fontFamily="Montserrat" fontSize="xl" fontWeight="bold" mb={2}>{title}</Heading>
      </CardHeader>
      <CardBody mt={0} fontSize="md" p={4}>
        <Flex justify="space-between" align="center">
          <Text as="div" noOfLines={3} fontFamily="Montserrat">
            {parse(body)}
          </Text>
          <Flex align="center" gap={4}>
            <Button
              color="black"
              leftIcon={<FaRegThumbsUp />}
              aria-label="Like Button"
              onClick={(e) => handleVoteClick(e, 'liked')}
            >
              (
              {upVotesBy.length}
              )
            </Button>
            <Button
              color="black"
              leftIcon={<FaRegThumbsDown />}
              aria-label="Dislike Button"
              onClick={(e) => handleVoteClick(e, 'disliked')}
            >
              (
              {downVotesBy.length}
              )
            </Button>
            <Icon as={FaRegCommentAlt} boxSize={5} />
            <Text color="#1D566E" fontFamily="Montserrat">
              {totalComments}
            </Text>
          </Flex>
        </Flex>
      </CardBody>
      <CardFooter as="footer" borderTop="1px solid #E0E0E0" bg="#FAFAFA" p={4}>
        <Flex justify="space-between" align="center">
          <Text color="#1D566E" fontFamily="Montserrat">
            {postedAt(createdAt)}
          </Text>
          <Flex align="center">
            <Avatar src={user.avatar} size="sm" ml={2} />
            <Text color="#1D566E" fontFamily="Montserrat">
              Created by
              {' '}
              <span style={{ fontWeight: 'bold' }}>{user.name}</span>
            </Text>
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
}

ThreadItem.propTypes = {
  ...ThreadShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default ThreadItem;
