export const formatDate = (timestamp) => {
  const ts = new Date(timestamp);
  const time = ts.toUTCString();
  return time;
};

// Not being used anymore replaced by Redirect
export const delayRedirect = (time, props) => {
  const {
    history: { push },
  } = props;
  setTimeout(() => push("/"), time);
};

// Not being used anymore replaced by connect -- authedUser change for registration
export const noDelayRedirect = (props) => {
  const {
    history: { push },
  } = props;
  push("/");
};

const score = (user) =>
  user.questions.length + Object.keys(user.answers).length;

export const sortUsers = (users) => {
  return Object.values(users).sort((a, b) => score(b) - score(a));
};
