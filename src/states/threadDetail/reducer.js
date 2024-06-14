import { ActionType } from './action';

const updateVote = (votes, userId, shouldAdd) => {
  const hasVoted = votes.includes(userId);
  if (shouldAdd) {
    return hasVoted ? votes : [...votes, userId];
  }
  return hasVoted ? votes.filter((id) => id !== userId) : votes;
};

function threadDetailReducer(threadDetail = null, action = {}) {
  if (!action.type) {
    return threadDetail;
  }

  const { type, payload } = action;

  switch (type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return payload.threadDetail;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.ADD_THREAD_COMMENT:
      return {
        ...threadDetail,
        comments: [payload.detailComment, ...threadDetail.comments],
      };

    case ActionType.UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: updateVote(threadDetail.upVotesBy, payload.userId, true),
        downVotesBy: updateVote(
          threadDetail.downVotesBy,
          payload.userId,
          false,
        ),
      };

    case ActionType.DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: updateVote(threadDetail.upVotesBy, payload.userId, false),
        downVotesBy: updateVote(threadDetail.downVotesBy, payload.userId, true),
      };

    case ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE:
      return {
        ...threadDetail,
        upVotesBy: updateVote(threadDetail.upVotesBy, payload.userId, false),
        downVotesBy: updateVote(
          threadDetail.downVotesBy,
          payload.userId,
          false,
        ),
      };

    case ActionType.UPVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === payload.commentId
          ? {
            ...comment,
            upVotesBy: updateVote(comment.upVotesBy, payload.userId, true),
            downVotesBy: updateVote(
              comment.downVotesBy,
              payload.userId,
              false,
            ),
          }
          : comment)),
      };

    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === payload.commentId
          ? {
            ...comment,
            upVotesBy: updateVote(comment.upVotesBy, payload.userId, false),
            downVotesBy: updateVote(
              comment.downVotesBy,
              payload.userId,
              true,
            ),
          }
          : comment)),
      };

    case ActionType.NEUTRALIZE_COMMENT_VOTE:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === payload.commentId
          ? {
            ...comment,
            upVotesBy: updateVote(comment.upVotesBy, payload.userId, false),
            downVotesBy: updateVote(
              comment.downVotesBy,
              payload.userId,
              false,
            ),
          }
          : comment)),
      };

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
