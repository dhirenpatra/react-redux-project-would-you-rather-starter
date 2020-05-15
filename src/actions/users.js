export const INITIAL_USERS = "INITIAL_USERS";
export const ADD_ANSWER_IN_QUESTION = "ADD_ANSWER_IN_QUESTION";
export const ADD_QUESTION_IN_USER = "ADD_QUESTION_IN_USER";

export const initialUsers = (users) => {
  return {
    type: INITIAL_USERS,
    users,
  };
};

export const addQuestionToUser = (question, authedUser) => {
  return {
    type: ADD_QUESTION_IN_USER,
    question,
    userid: authedUser,
  };
};

export const addAnswerToTheQuestions = (authedUser, id, answer) => {
  return {
    type: ADD_ANSWER_IN_QUESTION,
    authedUser,
    questionId: id,
    answer,
  };
};
