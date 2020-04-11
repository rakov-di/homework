import * as ACTIONS from '../actions/_consts'

const defaultState = {
  id: null,
  buildNumber: null,
  commitMessage: null,
  branchName: null,
  commitHash: null,
  authorName: null,
  status: null,
  start: null,
  duration: null,
  log: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_STORE_CUR_BUILD_DETAILS:
      return action.payload;
    case ACTIONS.UPDATE_STORE_CUR_BUILD_LOG:
      return {
        ...state,
        log: action.payload
      };
    default:
      return state;
  }
};
