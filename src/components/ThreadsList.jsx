import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ThreadItem from './ThreadItem';

const ThreadsItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  like: PropTypes.arrayOf(PropTypes.string).isRequired,
  dislike: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default function ThreadsList({
  threads, upVote, downVote, neutralizeVote, authUserId,
}) {
  const [voteStatus, setVoteStatus] = useState({});

  const handleVote = (id, type) => {
    setVoteStatus((prevStatus) => ({
      ...prevStatus,
      [id]: type === prevStatus[id] ? null : type,
    }));

    if (type === 'upVote') {
      upVote(id);
    } else if (type === 'downVote') {
      downVote(id);
    } else {
      neutralizeVote(id);
    }
  };

  useEffect(() => {
    const initialStatus = threads.reduce((status, thread) => {
      // eslint-disable-next-line no-param-reassign
      status[thread.id] = null;
      return status;
    }, {});
    setVoteStatus(initialStatus);
  }, [threads]);

  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUserId={authUserId}
          voteStatus={voteStatus[thread.id]}
          onVote={(type) => handleVote(thread.id, type)}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(ThreadsItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};
