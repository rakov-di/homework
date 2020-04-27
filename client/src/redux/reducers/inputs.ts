import * as ACTIONS from '../actions/_consts.ts'

type InputData = {
  value: string;
  isValid: boolean;
}

type InputState = {
  id?: InputData;
  repoName?: InputData;
  buildCommand?: InputData;
  mainBranch?: InputData;
  period?: InputData;
  commitHash?: InputData;
}

type InputActionsType = {
  type: string;
  name: string;
  value?: string;
  status?: boolean;
}

const defaultState: InputState = {
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
  },
  commitHash: {
    value: '',
    isValid: true
  }
};

export default (state: any = defaultState, action: InputActionsType) => {
  switch (action.type) {
    case ACTIONS.INPUT_SET_VALUE:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value
        }
      };
    case ACTIONS.INPUT_SET_VALIDATION_STATUS:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isValid: action.status
        }
      };
    default:
      return state;
  }
};
