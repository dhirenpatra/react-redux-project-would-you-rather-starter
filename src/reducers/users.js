import {
  INITIAL_USERS,
  ADD_ANSWER_IN_QUESTION,
  ADD_QUESTION_IN_USER,
  REGISTER_USER,
} from "../actions/types";

export const users = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_IN_QUESTION:
      const { authedUser, questionId, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [questionId]: answer,
          },
        },
      };
    case ADD_QUESTION_IN_USER:
      const { question, userid } = action;
      return {
        ...state,
        [userid]: {
          ...state[userid],
          questions: [...state[userid].questions, question.id],
        },
      };
    case REGISTER_USER:
      const { user } = action;
      return {
        ...state,
        [user.id]: user,
      };
    default:
      return state;
  }
};

export default users;
