import { USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE} from '../../constants/actionTypes';
import cFetch from '../../utils/cFetch';
import { API_CONFIG } from '../../config/api';
import { message } from 'antd';

function requestEcharts() {
  return {
    type: "requestEcharts",
    isFetching: true
  };
}


export function getEchartsSuccess(data) {
  return {
    type: "getEchartsSuccess",
    isFetching: false,
    data: data
  };
}

function usersError(message) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    message
  };
}


export function getEcharts() {
  return dispatch => {
////     let url=API_CONFIG.host + "/api/admin/explore/users";
    let url="/manage/data/echarts/show.json";
    return cFetch(url, {
      method: "GET",
      params: []
    }).then((response) => {
      dispatch(getEchartsSuccess(response));
    });
  };
}

function getEchartsSuccess(data) {
  return {type: "getEchartsSuccess", data: data, isFetching: true};
}

