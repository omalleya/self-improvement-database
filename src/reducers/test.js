import { increment, INCREMENT } from '../actions/test';

const reducer = (state = {
  counter: 0,
}, action) => {
  switch (action.type) {
    case (INCREMENT):
      return Object.assign({}, state, { counter: state.counter + 1 });
    default:
      return state;
  };
};

export default reducer;
