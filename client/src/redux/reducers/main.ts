import * as ACTIONS from '../actions/_consts.ts'

type MainActionTypes = {
  type: string;
  payload: {
    err?: string
  }
}

type MainState = {
  isFetchEnded: boolean,
  isFetching: boolean,
  formStatus: boolean | null,
  settings: Settings,
  builds: Build[]
}

const defaultState: MainState = {
  isFetchEnded: false,
  isFetching: false,
  formStatus: null,
  settings: {
    id: '',
    repoName: '',
    buildCommand: '',
    mainBranch: '',
    period: 0
  },
  builds: []
};

export default (state = defaultState, action: MainActionTypes) => {
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
