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

export function getStatInteractsIndex(params) {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/interact/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getStatInteractsIndexSuccess(response));
    });
  };
}

export function getVisitDistribute() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/interact/visit_chart.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getVisitDistributeSuccess(response));
    });
  };
}

function getVisitDistributeSuccess(data) {
  return {type: "getVisitDistributeSuccess", data: data, isFetching: true};
}
function getStatInteractsIndexSuccess(data) {
  return {type: "getStatInteractsIndexSuccess", data: data, isFetching: true};
}
