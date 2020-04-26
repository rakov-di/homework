import * as ACTIONS from '../actions/_consts.ts'

type ModalActionTypes = {
  type: string;
  status?: boolean;
}

type ModalState = {
  isModalShown: boolean
}

const defaultState: ModalState = {
  isModalShown: false,
};

export default (state = defaultState, action: ModalActionTypes) => {
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
