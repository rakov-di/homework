import * as ACTIONS from './_consts'
import { api } from '../../api'

export const setCurPage = name => ({
  type: ACTIONS.SET_CUR_PAGE,
  name
});

export const getCurSettings = () => {
  return dispatch => {
    dispatch(fetchStart());

    api.getSettings()
      .then(res => {
        dispatch(updateStoreSettings(res.data.data));
        dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(fetchFail(err.message));
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
          value: res.data.status,
          text: res.data.message
        }));
        dispatch(fetchDone());
      })
      .catch(err => {
        dispatch(updateFormStatus({
          value: 'error',
          text: err.message
        }));
        dispatch(fetchFail(err.message));
      });
  };
};

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

export const updateFormStatus = (payload) => {
  return {
    type: ACTIONS.UPDATE_FORM_STATUS,
    payload
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
