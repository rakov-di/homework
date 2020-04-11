import * as ACTIONS from './_consts'
import { api } from './api'

import Convert from 'ansi-to-html';

const convert = new Convert({fg: '#000', bg: '#000'});

export const getCurSettings = () => {
  return dispatch => {
    dispatch(fetchStart());

    api.getSettings()
      .then(res => {
        dispatch(updateStoreSettings(res.data.payload));
        dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const updateSettings = (settings) => {
  return dispatch => {
    dispatch(fetchStart());

    api.updateSettings(settings)
      .then(res => {
        dispatch(updateStoreSettings(settings));
        dispatch(updateFormStatus({
          value: 'success',
          text: res.data.message
        }));
        dispatch(fetchDone());
      })
      .catch(err => {
        debugger
        dispatch(updateFormStatus({
          value: 'error',
          text: err.response.data.message
        }));
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const getBuildsList = () => {
  return dispatch => {
    dispatch(fetchStart());

    api.getBuildsList()
      .then(res => {
        dispatch(updateStoreBuildsList(res.data.data));
        dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(updateFormStatus({
          value: 'error',
          text: err.message
        }));
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const addCommitToQueue = (commitHash) => {
  return dispatch => {
    dispatch(fetchStart());

    api.addCommitToQueue(commitHash)
      .then(res => {
        dispatch(getBuildsList()); // ???
        document.location.href = `/build/${res.data.payload.id}`;
        // dispatch(updateStoreBuildsList(res.data.data));
        // dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(inputSetValidationStatus('commitHash', false))
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const getBuildDetails = (buildId) => {
  return dispatch => {
    dispatch(fetchStart());

    api.getBuildDetails(buildId)
      .then(res => {

        dispatch(updateStoreCurBuildDetails(res.data.data));
        dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

export const getBuildLog = (buildId) => {
  return dispatch => {
    dispatch(fetchStart());

    api.getBuildLog(buildId)
      .then(res => {
        dispatch(updateStoreCurBuildLog(convert.toHtml(res.data)));
        dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(fetchFail(err.response.data.message));
      });
  };
};

// Promise.all([
//   api.getBuildDetails(buildId),
//   api.getBuildLog(buildId)
// ])
//   .then(([settings, build, log]) => {
//     this.setState({
//       settings: settings.data.data,
//       curBuild: build.data.data,
//       curBuildLog: convert.toHtml(log.data)
//     })
//   })
//   .catch(error => console.error(error.message))

export const fetchStart = () => ({
  type: ACTIONS.FETCH_START,
});

export const fetchDone = () => ({
  type: ACTIONS.FETCH_DONE
});

export const fetchFail = (err) => ({
  type: ACTIONS.FETCH_FAIL,
  payload: {
    err: err
  }
});

export const updateStoreSettings = (payload) => ({
  type: ACTIONS.UPDATE_STORE_SETTINGS,
  payload
});

export const updateStoreBuildsList = (payload) => ({
  type: ACTIONS.UPDATE_STORE_BUILDS_LIST,
  payload
});

export const updateStoreCurBuildDetails = (payload) => ({
  type: ACTIONS.UPDATE_STORE_CUR_BUILD_DETAILS,
  payload
});

export const updateStoreCurBuildLog = (payload) => ({
  type: ACTIONS.UPDATE_STORE_CUR_BUILD_LOG,
  payload
});

export const updateFormStatus = (payload) => {
  return {
    type: ACTIONS.UPDATE_FORM_STATUS,
    payload
  }
};

export const openModal = () => {
  return dispatch => {
    dispatch(modalVisibilityToggle(true));
  };
};

export const closeModal = () => {
  return dispatch => {
    dispatch(modalVisibilityToggle(false));
    dispatch(inputSetValue('commitHash', ''));
    dispatch(inputSetValidationStatus('commitHash', true));
  };
};

export const modalVisibilityToggle = (status) => {
  return {
    type: ACTIONS.MODAL_VISIBILITY_TOGGLE,
    status
  }
};

export const inputSetValue = (name, value) => {
  return {
    type: ACTIONS.INPUT_SET_VALUE,
    name,
    value
  };
};

export const inputSetValidationStatus = (name, status) => {
  return {
    type: ACTIONS.INPUT_SET_VALIDATION_STATUS,
    name,
    status
  }
};
