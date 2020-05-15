import { _getUsers, _getQuestions } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
import { initialUsers } from "./users";
import { initialQuestions } from "./questions";

export const INITIAL_DATA = "INITIAL_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(initialUsers(users));
      dispatch(initialQuestions(questions));
      dispatch(hideLoading());
    });
  };
};

export default handleInitialData;
