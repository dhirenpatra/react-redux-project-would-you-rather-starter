import { AUTHED_USER, LOGOUT_USER } from "./types";

export const authedUser = (user) => {
  return {
    type: AUTHED_USER,
    userId: user.id,
    username: user.name,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};
