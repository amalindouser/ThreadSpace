import { ActionType } from './action';

const initialState = {
  threads: [],
  users: [],
  isLoading: false,
  error: null,
};

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return {
        ...state,
        threads: action.payload.threads,
        users: action.payload.users,
        isLoading: false,
        error: null,
      };
    case ActionType.ADD_THREAD:
      return {
        ...state,
        threads: [action.payload.thread, ...state.threads],
      };
    case ActionType.UPVOTE_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => (thread.id === action.payload.threadId
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.upVotesBy, action.payload.userId],
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          }
          : thread)),
      };
    case ActionType.DOWNVOTE_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => (thread.id === action.payload.threadId
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.downVotesBy, action.payload.userId],
          }
          : thread)),
      };
    case ActionType.NEUTRALIZE_THREAD_VOTE:
      return {
        ...state,
        threads: state.threads.map((thread) => (thread.id === action.payload.threadId
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          }
          : thread)),
      };
    default:
      return state;
  }
}

export default threadsReducer;
