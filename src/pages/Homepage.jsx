import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  Heading,
  IconButton,
  Link as ChakraLink,
  Tag,
  Flex,
  Text,
} from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
import { fetchLeaderboards } from '../states/leaderboards/action';
import {
  fetchThreads,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeThreadVote,
} from '../states/threads/action';
import LeaderboardItem from '../components/LeaderboardItem';

function LeaderboardHeader() {
  return (
    <Flex as="header" mt={5} justify="space-between" fontSize="1.5rem">
      <Text>User</Text>
      <Text>Score</Text>
    </Flex>
  );
}

function LeaderboardList({ leaderboards, authUser }) {
  return (
    <Flex mt={2} direction="column" gap={2} fontSize="1.5rem">
      {leaderboards && leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          user={leaderboard.user}
          score={leaderboard.score}
          authUser={authUser}
          isTopUser={index === 0}
        />
      ))}
    </Flex>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

function Homepage() {
  const dispatch = useDispatch();
  const {
    threads, users, isLoading, error,
  } = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.authUser);
  const leaderboards = useSelector((state) => state.leaderboards || []);

  useEffect(() => {
    dispatch(fetchThreads());
    if (leaderboards.length === 0) {
      dispatch(fetchLeaderboards());
    }
  }, [dispatch, leaderboards.length]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  const [localVotes, setLocalVotes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const threadList = Array.isArray(threads)
    ? threads.map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId),
      votes: localVotes[thread.id] !== undefined ? localVotes[thread.id] : thread.votes,
    }))
    : [];

  const categories = threads ? [...new Set(threads.map((thread) => thread.category))] : [];

  const voteHandler = (threadId, action) => {
    const previousVotes = localVotes[threadId] !== undefined ? localVotes[threadId] : threads.find((thread) => thread.id === threadId).votes;
    let newVotes;

    if (action === 'upvote') {
      newVotes = previousVotes + 1;
      setLocalVotes((prev) => ({ ...prev, [threadId]: newVotes }));
      dispatch(asyncToggleUpVoteThread(threadId));
    } else if (action === 'downvote') {
      newVotes = previousVotes - 1;
      setLocalVotes((prev) => ({ ...prev, [threadId]: newVotes }));
      dispatch(asyncToggleDownVoteThread(threadId));
    } else if (action === 'neutralize') {
      newVotes = previousVotes;
      setLocalVotes((prev) => ({ ...prev, [threadId]: newVotes }));
      dispatch(asyncNeutralizeThreadVote(threadId));
    }
  };

  const filteredThreads = selectedCategory
    ? threadList.filter((thread) => thread.category === selectedCategory)
    : threadList;

  return (
    <Box as="main" width="auto" paddingY="5rem" backgroundColor="white">
      <Container as="section" maxWidth="5xl">
        <Box>
          <Heading as="h2" fontSize="3xl" color="teal.900" marginTop="9rem" fontFamily="Montserrat">
            Discussions
          </Heading>
          <Flex wrap="wrap" gap={2} mt={4} mb={8}>
            {categories && categories.map((category) => (
              <Tag
                key={category}
                size="md"
                variant="solid"
                colorScheme="teal"
                onClick={() => setSelectedCategory(category)}
                cursor="pointer"
                fontFamily="Montserrat"
              >
                #
                {category}
              </Tag>
            ))}
          </Flex>
          <Flex>
            <Box flex="2">
              {filteredThreads && filteredThreads.length > 0 ? (
                filteredThreads.map((thread) => (
                  <ThreadItem
                    key={thread.id}
                    id={thread.id}
                    title={thread.title}
                    body={thread.body}
                    category={thread.category}
                    createdAt={thread.createdAt}
                    user={thread.user}
                    upVotesBy={thread.upVotesBy}
                    downVotesBy={thread.downVotesBy}
                    totalComments={thread.totalComments}
                    upVote={() => voteHandler(thread.id, 'upvote')}
                    downVote={() => voteHandler(thread.id, 'downvote')}
                    neutralizeVote={() => voteHandler(thread.id, 'neutralize')}
                    authUserId={authUser.id}
                  />
                ))
              ) : (
                <Text>No threads available.</Text>
              )}
            </Box>
            <Box flex="1" ml={4}>
              <Heading as="h3" fontSize="2xl" color="teal.900" mt="1rem" fontFamily="Montserrat">
                Active User Rankings
              </Heading>
              <LeaderboardHeader />
              <LeaderboardList leaderboards={leaderboards} authUser={authUser} />
            </Box>
          </Flex>
        </Box>
        <ChakraLink as={Link} to="/add" position="fixed" bottom={30} right={30}>
          <IconButton
            isRound
            size="lg"
            aria-label="Add thread"
            colorScheme="teal"
            icon={<AiOutlinePlusCircle color="white" />}
          />
        </ChakraLink>
      </Container>
    </Box>
  );
}

export default Homepage;
