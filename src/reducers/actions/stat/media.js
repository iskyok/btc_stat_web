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


export function getStatMediaIndex() {
  return dispatch => {
    let url=API_CONFIG.host + "/api/v1/stat/medias";
    // let url="/manage/data/stat/media/index.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getStatMediaIndexSuccess(response));
    });
  };

}


export function getCityDistribute() {
  return dispatch => {
    // let url=API_CONFIG.host + "/admin/explore/users";
    let url="/manage/data/stat/media/city_distribute.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getCityDistributeSuccess(response));
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

function getCityDistributeSuccess(data) {
  return {type: "getCityDistributeSuccess", data: data, isFetching: true};
}
function getAgeDistributeSuccess(data) {
  return {type: "getAgeDistributeSuccess", data: data, isFetching: true};
}
function getStatMediaIndexSuccess(data) {
  return {type: "getStatMediaIndexSuccess", data: data, isFetching: true};
}
