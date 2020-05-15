export const AUTHED_USER = "AUTHED_USER";
export const LOGOUT_USER = "LOGOUT_USER";

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
