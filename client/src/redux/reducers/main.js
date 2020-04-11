import * as ACTIONS from '../actions/_consts'

const defaultState = {
  isFetchEnded: false,
  isFetching: false,
  formStatus: null,
  settings: {
    id: null,
    repoName: null,
    buildCommand: null,
    mainBranch: null,
    period: null
  },
  builds: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case ACTIONS.FETCH_DONE:
      return {
        ...state,
        isFetching: false,
        isFetchEnded: true,
      };
    case ACTIONS.FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        isFetchEnded: true,
        fetchErr: action.payload.err
      };
    case ACTIONS.UPDATE_STORE_SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    case ACTIONS.UPDATE_STORE_BUILDS_LIST:
      return {
        ...state,
        builds: action.payload
      };
    case ACTIONS.UPDATE_FORM_STATUS:
      return {
        ...state,
        formStatus: action.payload
      };
    default:
      return state;
  }
};
