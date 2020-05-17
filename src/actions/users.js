import {
  INITIAL_USERS,
  ADD_ANSWER_IN_QUESTION,
  ADD_QUESTION_IN_USER,
  REGISTER_USER,
} from "./types";

import { showLoading, hideLoading } from "react-redux-loading";
import { _registerUser } from "../utils/_DATA";
import { authedUser } from "./shared";

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

const registerUser = (user) => {
  return {
    type: REGISTER_USER,
    user,
  };
};

export const handleRegisterUser = ({ username, name }) => {
  return (dispatch) => {
    dispatch(showLoading());
    return _registerUser({
      username,
      name,
    }).then((user) => {
      dispatch(registerUser(user));
      dispatch(authedUser(user));
      dispatch(hideLoading());
    });
  };
};
