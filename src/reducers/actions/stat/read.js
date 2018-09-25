import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function requestEcharts() {
  return {
    type: "requestEcharts",
    isFetching: true
  };
}


function usersError(message) {
  return {
    type: "USERS_FAILURE",
    isFetching: false,
    message
  };
}

export function getReadDistribute(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/v1/stat/reads";
    // let url="/manage/data/stat/read/read.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getReadDistributeSuccess(response));
    });
  };
}
export function getStatReadsIndex(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/v1/stat/reads";
    // let url="/manage/data/stat/read/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getStatReadsIndexSuccess(response));
    });
  };
}

function getReadDistributeSuccess(data) {
  return {type: "getReadDistributeSuccess", data: data, isFetching: true};
}

function getStatReadsIndexSuccess(data) {
  return {type: "getStatReadsIndexSuccess", data: data, isFetching: true};
}
