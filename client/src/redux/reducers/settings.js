import * as ACTIONS from '../actions/_consts'

const defaultState = {
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
