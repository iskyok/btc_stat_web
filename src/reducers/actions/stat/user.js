import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function requestEcharts() {
  return {
    type: "requestEcharts",
    isFetching: true
  };
}

export function getStatUserIndex(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/company/users/increase_dashboard";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getStatUserIndexSuccess(response));
    });
  };
}

export function getStatDashUser(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/company/stats/users/dashboard";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatDashUserSuccess", data: response});
    });
  };
}

export function getSexDistribute() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/user/sex.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getSexDistributeSuccess(response));
    });
  };
}
export function getAgeDistribute() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/media/age_distribute.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getAgeDistributeSuccess(response));
    });
  };
}

function getSexDistributeSuccess(data) {
  return {type: "getSexDistributeSuccess", data: data, isFetching: true};
}
function getAgeDistributeSuccess(data) {
  return {type: "getAgeDistributeSuccess", data: data, isFetching: true};
}

function getStatUserIndexSuccess(data) {
  return {type: "getStatUserIndexSuccess", data: data, isFetching: true};
}

