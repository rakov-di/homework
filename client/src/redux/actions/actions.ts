import * as ACTIONS from './_consts.ts'
import { api } from './api.ts'
import { Dispatch } from 'redux';

// declare module 'ansi-to-html'
import Convert from 'ansi-to-html';

const convert = new Convert({fg: '#000', bg: '#000'});

type Response = {
  data: {
    payload: any;
    message: string;
  }
}

type Error = {
  response: {
    data: {
      message: string
    }
  }
}

export const getCurSettings = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.getSettings()
      .then((res: Response) => {
        dispatch(updateStoreSettings(res.data.payload));
        dispatch(fetchDone());
      })
      .catch((err: Error) => {
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const updateSettings = (settings: UpdateSettingsParams) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchStart());

    api.updateSettings(settings)
      .then((res: Response) => {
        dispatch(updateStoreSettings(settings));
        dispatch(updateFormStatus({
          value: 'success',
          text: res.data.message
        }));
        dispatch(fetchDone());
      })
      .catch((err: Error) => {
        dispatch(updateFormStatus({
          value: 'error',
          text: err.response.data.message
        }));
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const getBuildsList = ():any => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchStart());

    api.getBuildsList()
      .then((res: Response) => {
        dispatch(updateStoreBuildsList(res.data.payload));
        dispatch(fetchDone());
      })
      .catch((err: Error) => {
        dispatch(updateFormStatus({
          value: 'error',
          text: err.response.data.message
        }));
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const addCommitToQueue = (commitHash: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchStart());

    api.addCommitToQueue(commitHash)
      .then((res: Response) => {
        dispatch(getBuildsList()); // ???
        document.location.href = `/build/${res.data.payload.id}`;
        // dispatch(updateStoreBuildsList(res.data.data));
        // dispatch(fetchDone());
      })
      .catch((err: Error) => {
        dispatch(inputSetValidationStatus('commitHash', false))
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const getBuildDetails = (buildId: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchStart());

    api.getBuildDetails(buildId)
      .then((res: Response) => {
        dispatch(updateStoreCurBuildDetails(res.data.payload));
        dispatch(fetchDone());
      })
      .catch((err: Error) => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const getBuildLog = (buildId: string) => {
  return (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchStart());

    api.getBuildLog(buildId)
      .then((res: Response) => {
        dispatch(updateStoreCurBuildLog(convert.toHtml(res.data.payload)));
        dispatch(fetchDone());
      })
      .catch((err: Error) => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

type ActionType = {
  type: string;
}

type ActionTypeAndPayload = {
  type: string;
  payload: any
}

type ActionTypes = ActionType | ActionTypeAndPayload

export const fetchStart = ():ActionType => ({
  type: ACTIONS.FETCH_START,
});

export const fetchDone = ():ActionType => ({
  type: ACTIONS.FETCH_DONE
});

export const fetchFail = (err: string):ActionTypeAndPayload => ({
  type: ACTIONS.FETCH_FAIL,
  payload: {
    err: err
  }
});

export const updateStoreSettings = (payload: UpdateSettingsParams):ActionTypeAndPayload => ({
  type: ACTIONS.UPDATE_STORE_SETTINGS,
  payload
});

export const updateStoreBuildsList = (payload: any):ActionTypeAndPayload => ({
  type: ACTIONS.UPDATE_STORE_BUILDS_LIST,
  payload
});

export const updateStoreCurBuildDetails = (payload: any):ActionTypeAndPayload => ({
  type: ACTIONS.UPDATE_STORE_CUR_BUILD_DETAILS,
  payload
});

export const updateStoreCurBuildLog = (payload: string):ActionTypeAndPayload => ({
  type: ACTIONS.UPDATE_STORE_CUR_BUILD_LOG,
  payload
});

type FormStatus = {
  value: 'success' | 'error';
  text: string;
}

export const updateFormStatus = (payload: FormStatus):ActionTypeAndPayload => {
  return {
    type: ACTIONS.UPDATE_FORM_STATUS,
    payload
  }
};

// TODO Кажется, можно их как-то унифицировать до одного типа
type ActionModalVisibilityToggle = {
  type: string;
  status: boolean;
}

type ActionInputSetValue = {
  type: string;
  name: string;
  value: string;
}

type ActionInputSetValidationStatus = {
  type: string;
  name: string;
  status: boolean;
}

type ActionsModal = ActionModalVisibilityToggle | ActionInputSetValue | ActionInputSetValidationStatus

export const openModal = () => {
  return (dispatch: Dispatch<ActionsModal>) => {
    dispatch(modalVisibilityToggle(true));
  };
};

export const closeModal = () => {
  return (dispatch: Dispatch<ActionsModal>) => {
    dispatch(modalVisibilityToggle(false));
    dispatch(inputSetValue('commitHash', ''));
    dispatch(inputSetValidationStatus('commitHash', true));
  };
};

export const modalVisibilityToggle = (status: boolean):ActionModalVisibilityToggle => {
  return {
    type: ACTIONS.MODAL_VISIBILITY_TOGGLE,
    status
  }
};

export const inputSetValue = (name: string, value: string):ActionInputSetValue => {
  return {
    type: ACTIONS.INPUT_SET_VALUE,
    name,
    value
  };
};

export const inputSetValidationStatus = (name: string, status: boolean):ActionInputSetValidationStatus => {
  return {
    type: ACTIONS.INPUT_SET_VALIDATION_STATUS,
    name,
    status
  }
};
