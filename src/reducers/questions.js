import {
  INITIAL_QUESTIONS,
  ADD_USER_ID_IN_QUESTION,
  ADD_QUESTION,
} from "../actions/types";

export const initialQuestionData = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_USER_ID_IN_QUESTION:
      const { authedUser, questionId, answer } = action;
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: [...state[questionId][answer].votes, authedUser],
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
};

export default initialQuestionData;
