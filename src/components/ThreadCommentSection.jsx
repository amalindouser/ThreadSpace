import React from 'react';
import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ThreadCommentItem from './ThreadCommentItem';

const ThreadUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const ThreadCommentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ThreadUserShape),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function ThreadCommentList({
  comments,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  userId,
}) {
  return (
    <Flex direction="column">
      {comments.map((comment) => (
        <ThreadCommentItem
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          owner={comment.owner}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          upVote={onUpVote}
          downVote={onDownVote}
          neutralizeVote={onNeutralizeVote}
          authUserId={userId}
        />
      ))}
    </Flex>
  );
}

ThreadCommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(ThreadCommentShape)).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
