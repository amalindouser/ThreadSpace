import React, { useEffect, useState } from 'react';
import {
  Box, Card, Container, Heading, Textarea, Button, Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import CommentSection from '../components/ThreadCommentSection';
import ThreadDetailItem from '../components/ThreadDetailItem';
import {
  asyncAddThreadComment,
  asyncNeutralizeThreadDetailVote,
  asyncNeutralizeVoteComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const handleVote = (action, payload) => {
    dispatch(action(payload));
  };

  const handleAddComment = () => {
    dispatch(asyncAddThreadComment({ threadId: id, commentValue }));
    setCommentValue(''); // Reset the comment input field after submitting
  };

  if (!threadDetail) return null;

  return (
    <Box as="main" bg="white" py="5rem" color="#FFFFFF" marginTop="9rem">
      <Container maxW="5xl">
        <Flex direction={{ base: 'column', md: 'row' }} gap="1rem">
          <Card bg="" p="2rem" borderRadius="md" color="#1D566E" flex="3" mr="1rem" maxW="800px" minH="500px">
            <ThreadDetailItem
              upVote={() => handleVote(asyncToggleUpVoteThreadDetail, id)}
              downVote={() => handleVote(asyncToggleDownVoteThreadDetail, id)}
              neutralizeVote={() => handleVote(asyncNeutralizeThreadDetailVote, id)}
              authUserId={authUser.id}
              {...threadDetail}
            />
          </Card>
          <Card bg="black" p="2rem" borderRadius="md" color="#1D566E" flex="2" minH="500px">
            <Heading as="h2" size="lg" color="#FFFFFF" mb="1rem">Comments</Heading>
            <Textarea
              placeholder="Masukkan komentar Anda..."
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              mb="1rem"
            />
            <Button colorScheme="teal" onClick={handleAddComment} leftIcon={<FaPaperPlane />} />
            <CommentSection
              comments={threadDetail.comments}
              onUpVote={(commentId) => handleVote(asyncToggleUpVoteComment, { threadId: id, commentId })}
              onDownVote={(commentId) => handleVote(asyncToggleDownVoteComment, { threadId: id, commentId })}
              onNeutralizeVote={(commentId) => handleVote(asyncNeutralizeVoteComment, { threadId: id, commentId })}
              userId={authUser.id}
            />
          </Card>
        </Flex>
      </Container>
    </Box>
  );
}

export default DetailPage;
