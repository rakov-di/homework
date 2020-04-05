import * as ACTIONS from '../actions/_consts'

const defaultState = {
  curPage: '',
  fetchEnded: false,
  isFetching: false,
  fetchErr: '',
  formStatus: null,
  settings: {
    id: null,
    repoName: null,
    buildCommand: null,
    mainBranch: null,
    period: null
  },
  inputs: {
    id: {
      value: '',
      isValid: true
    },
    repoName: {
      value: '',
      isValid: true
    },
    buildCommand: {
      value: '',
      isValid: true
    },
    mainBranch: {
      value: '',
      isValid: true
    },
    period: {
      value: '',
      isValid: true
    }
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.SET_CUR_PAGE:
      return {
        ...state,
        curPage: action.name
      };
    case ACTIONS.FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case ACTIONS.FETCH_DONE:
      return {
        ...state,
        isFetching: false,
        fetchEnded: true,
      };
    case ACTIONS.FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        fetchEnded: true,
        fetchErr: action.payload.err
      };
    case ACTIONS.UPDATE_STORE_SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    case ACTIONS.UPDATE_FORM_STATUS:
      return {
        ...state,
        formStatus: action.payload
      };
    case ACTIONS.INPUT_SET_VALUE:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: {
            ...state.inputs[action.name],
            value: action.value
          }
        }
      };
    case ACTIONS.INPUT_SET_VALIDATION_STATUS:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: {
            ...state.inputs[action.name],
            isValid: action.status
          }
        }
      };
    default:
      return state;
  }
};
