import * as ACTIONS from '../actions/_consts.ts'

type CurBuildActionTypes = {
  type: string;
  payload: string;
}

type CurBuildState = {
  id: string | null;
  buildNumber: string | null;
  commitMessage: string | null;
  branchName: string | null;
  commitHash: string | null;
  authorName: string | null;
  status: string | null;
  start: string | null;
  duration: string | null;
  log: string | null;
}

const defaultState: CurBuildState = {
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

export default (state = defaultState, action: CurBuildActionTypes) => {
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
