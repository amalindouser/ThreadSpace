import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Box, Button, CardBody, CardFooter, CardHeader, Flex, Heading, Tag, Text,
} from '@chakra-ui/react';
import {
  AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike,
} from 'react-icons/ai';
import parse from 'html-react-parser';
import postedAt from '../utils/index';

const useVoting = (
  authUserId,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
) => {
  const [voteStatus, setVoteStatus] = useState({
    isUpVoted: upVotesBy.includes(authUserId),
    isDownVoted: downVotesBy.includes(authUserId),
  });

  const handleVote = useCallback(
    (type) => {
      const isUpVote = type === 'upVote';
      const isActive = isUpVote ? voteStatus.isUpVoted : voteStatus.isDownVoted;
      const voteAction = isUpVote ? upVote : downVote;

      if (isActive) {
        neutralizeVote();
        setVoteStatus({
          isUpVoted: false,
          isDownVoted: false,
        });
      } else {
        voteAction();
        setVoteStatus({
          isUpVoted: isUpVote,
          isDownVoted: !isUpVote,
        });
      }
    },
    [upVote, downVote, neutralizeVote, voteStatus],
  );

  return { voteStatus, handleVote };
};

function ThreadDetailItem(props) {
  const {
    upVote,
    downVote,
    neutralizeVote,
    authUserId,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
  } = props;
  const { voteStatus, handleVote } = useVoting(
    authUserId,
    upVotesBy,
    downVotesBy,
    upVote,
    downVote,
    neutralizeVote,
  );

  return (
    <Box
      bg="white"
      p={6}
      rounded="lg"
      shadow="md"
      border="1px"
      borderColor="gray.200"
      fontFamily="Montserrat"
      boxShadow="none"
    >
      <CardHeader as="header">
        <Tag
          size="lg"
          bg="white"
          color="#1D566E"
          variant="solid"
          borderRadius="full"
          mb={4}
          fontFamily="Montserrat"
        >
          <Text fontSize="50">
            #
            {category}
          </Text>
        </Tag>
        <Heading as="h2" size="xl" color="#1D566E" fontFamily="Montserrat">
          {title}
        </Heading>
      </CardHeader>
      <CardBody fontSize="lg" color="1D566E" mt={-3} fontFamily="Montserrat">
        <Text as="div" fontSize="md" mb={4} fontFamily="Montserrat">
          {parse(body)}
        </Text>
      </CardBody>
      <CardFooter as="footer" justify="space-between" gap={4} fontSize="md" fontFamily="Montserrat">
        <Flex gap={2} align="center">
          <Button
            colorScheme="blue"
            variant="outline"
            isActive={voteStatus.isUpVoted}
            leftIcon={voteStatus.isUpVoted ? <AiFillLike /> : <AiOutlineLike />}
            aria-label="Upvote Button"
            onClick={() => handleVote('upVote')}
          >
            <Text>{upVotesBy.length}</Text>
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            isActive={voteStatus.isDownVoted}
            leftIcon={voteStatus.isDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
            aria-label="Downvote Button"
            onClick={() => handleVote('downVote')}
          >
            <Text>{downVotesBy.length}</Text>
          </Button>
        </Flex>
        <Flex alignItems="center" gap={4}>
          <Text>{postedAt(createdAt, 'id')}</Text>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar size="sm" name={owner.name} src={owner.avatar} />
            <Text>
              Created by
              {' '}
              <Heading as="span" fontSize="md" color="#1D566E" fontFamily="Montserrat">
                {owner.name}
              </Heading>
            </Text>
          </Box>
        </Flex>
      </CardFooter>
    </Box>
  );
}

const OwnerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ThreadDetailShape = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(OwnerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetailItem.propTypes = {
  ...ThreadDetailShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};

export default ThreadDetailItem;
