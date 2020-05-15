const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Action Type", action.type);
  console.log("Action ", action);
  console.log("Prev State is ", store.getState());
  const returnedValue = next(action);
  console.log("New State is ", store.getState());
  console.groupEnd();
  return returnedValue;
};

export default logger;
