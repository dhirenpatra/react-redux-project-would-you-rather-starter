import { AUTHED_USER, LOGOUT_USER } from "../actions/types";

export const authedUser = (state = {}, { type, userId, username }) => {
  switch (type) {
    case AUTHED_USER:
      return {
        userId,
        username,
      };
    case LOGOUT_USER:
      return {
        userId: undefined,
        username: undefined,
      };
    default:
      return state;
  }
};

export default authedUser;
