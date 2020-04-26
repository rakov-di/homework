import * as ACTIONS from './_consts.ts'
import { api } from './api.ts'
import { Dispatch } from 'redux';

// declare module 'ansi-to-html'
import Convert from 'ansi-to-html';

const convert = new Convert({fg: '#000', bg: '#000'});

export type ActionsTypes = any;

export const getCurSettings = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.getSettings()
      .then((res: any) => {
        dispatch(updateStoreSettings(res.data.payload));
        dispatch(fetchDone());
      })
      .catch((err: any) => {
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const updateSettings = (settings: UpdateSettingsParams) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.updateSettings(settings)
      .then((res: any) => {
        dispatch(updateStoreSettings(settings));
        dispatch(updateFormStatus({
          value: 'success',
          text: res.data.message
        }));
        dispatch(fetchDone());
      })
      .catch((err: any) => {
        dispatch(updateFormStatus({
          value: 'error',
          text: err.response.data.message
        }));
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const getBuildsList = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.getBuildsList()
      .then((res: any) => {
        dispatch(updateStoreBuildsList(res.data.payload));
        dispatch(fetchDone());
      })
      .catch((err: any) => {
        dispatch(updateFormStatus({
          value: 'error',
          text: err.message
        }));
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const addCommitToQueue = (commitHash: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.addCommitToQueue(commitHash)
      .then((res: any) => {
        dispatch(getBuildsList()); // ???
        document.location.href = `/build/${res.data.payload.id}`;
        // dispatch(updateStoreBuildsList(res.data.data));
        // dispatch(fetchDone());
      })
      .catch((err: any) => {
        dispatch(inputSetValidationStatus('commitHash', false))
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const getBuildDetails = (buildId: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.getBuildDetails(buildId)
      .then((res: any) => {
        dispatch(updateStoreCurBuildDetails(res.data.payload));
        dispatch(fetchDone());
      })
      .catch((err: any) => {
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const getBuildLog = (buildId: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(fetchStart());

    api.getBuildLog(buildId)
      .then((res: any) => {
        dispatch(updateStoreCurBuildLog(convert.toHtml(res.data.payload)));
        dispatch(fetchDone());
      })
      .catch((err: any) => {
        dispatch(fetchFail(err.response && err.response.data && err.response.data.message));
      });
  };
};

export const fetchStart = () => ({
  type: ACTIONS.FETCH_START,
});

export const fetchDone = () => ({
  type: ACTIONS.FETCH_DONE
});

export const fetchFail = (err: any) => ({
  type: ACTIONS.FETCH_FAIL,
  payload: {
    err: err
  }
});

export const updateStoreSettings = (payload: UpdateSettingsParams) => ({
  type: ACTIONS.UPDATE_STORE_SETTINGS,
  payload
});

export const updateStoreBuildsList = (payload: any) => ({
  type: ACTIONS.UPDATE_STORE_BUILDS_LIST,
  payload
});

export const updateStoreCurBuildDetails = (payload: any) => ({
  type: ACTIONS.UPDATE_STORE_CUR_BUILD_DETAILS,
  payload
});

export const updateStoreCurBuildLog = (payload: string) => ({
  type: ACTIONS.UPDATE_STORE_CUR_BUILD_LOG,
  payload
});

type FormStatus = {
  value: 'success' | 'error';
  text: string;
}

export const updateFormStatus = (payload: FormStatus) => {
  return {
    type: ACTIONS.UPDATE_FORM_STATUS,
    payload
  }
};

export const openModal = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(modalVisibilityToggle(true));
  };
};

export const closeModal = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(modalVisibilityToggle(false));
    dispatch(inputSetValue('commitHash', ''));
    dispatch(inputSetValidationStatus('commitHash', true));
  };
};

export const modalVisibilityToggle = (status: boolean) => {
  return {
    type: ACTIONS.MODAL_VISIBILITY_TOGGLE,
    status
  }
};

export const inputSetValue = (name: string, value: string) => {
  return {
    type: ACTIONS.INPUT_SET_VALUE,
    name,
    value
  };
};

export const inputSetValidationStatus = (name: string, status: boolean) => {
  return {
    type: ACTIONS.INPUT_SET_VALIDATION_STATUS,
    name,
    status
  }
};
