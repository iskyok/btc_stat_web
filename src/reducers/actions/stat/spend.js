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

export function getStatSpendsIndex(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/v1/stat/consumes";
    // let url="/manage/data/stat/spend/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getStatSpendsIndexSuccess(response));
    });
  };
}export function getSpendDistribute() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/spend/spend.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getSpendDistributeSuccess(response));
    });
  };
}
export function getAgeDistribute() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/spend/age.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getAgeDistributeSuccess(response));
    });
  };
}
function getSpendDistributeSuccess(data) {
  return {type: "getSpendDistributeSuccess", data: data, isFetching: true};
}
function getAgeDistributeSuccess(data) {
  return {type: "getAgeDistributeSuccess", data: data, isFetching: true};
}

function getStatSpendsIndexSuccess(data) {
  return {type: "getStatSpendsIndexSuccess", data: data, isFetching: true};
}
