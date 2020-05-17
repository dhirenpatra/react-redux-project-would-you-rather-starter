import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";
import { addAnswerToTheQuestions, addQuestionToUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

import {
  INITIAL_QUESTIONS,
  ADD_USER_ID_IN_QUESTION,
  ADD_QUESTION,
} from "./types";

export const initialQuestions = (questions) => {
  return {
    type: INITIAL_QUESTIONS,
    questions,
  };
};

const addUserIdWhoAnswerdToQuestion = (authedUser, id, answer) => {
  return {
    type: ADD_USER_ID_IN_QUESTION,
    authedUser,
    questionId: id,
    answer,
  };
};

export const handleAnswerForQuestion = (question_id, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return _saveQuestionAnswer({
      authedUser: authedUser.userId,
      qid: question_id,
      answer,
    })
      .then(() => {
        dispatch(
          addUserIdWhoAnswerdToQuestion(authedUser.userId, question_id, answer)
        );
      })
      .then(() =>
        dispatch(
          addAnswerToTheQuestions(authedUser.userId, question_id, answer)
        )
      )
      .then(() => dispatch(hideLoading()));
  };
};

const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const handleAddQuestion = ({ optionOne, optionTwo }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser.userId,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question, authedUser.userId));
      })
      .then(() => dispatch(hideLoading()));
  };
};
