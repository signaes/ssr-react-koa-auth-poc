const resolve = ({ reducers, state, action }) => {
  const reducer = reducers[action.type];

  return typeof reducer === 'function' ? reducer() : state;
};

export default resolve;
