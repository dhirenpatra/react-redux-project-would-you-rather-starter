export const formatDate = (timestamp) => {
  const ts = new Date(timestamp);
  const time = ts.toUTCString();
  return time;
};

export const delayRedirect = (time, props) => {
  const {
    history: { push },
  } = props;
  setTimeout(() => push("/"), time);
};

const score = (user) =>
  user.questions.length + Object.keys(user.answers).length;

export const sortUsers = (users) => {
  return Object.values(users).sort((a, b) => score(b) - score(a));
};
