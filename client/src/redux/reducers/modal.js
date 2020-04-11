import * as ACTIONS from '../actions/_consts'

const defaultState = {
  isModalShown: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.MODAL_VISIBILITY_TOGGLE:
      return {
        ...state,
        isModalShown: action.status,
      };
    default:
      return state;
  }
};
