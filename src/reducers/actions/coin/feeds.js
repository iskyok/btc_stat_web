import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getDashFeeds(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/feeds";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getDashFeedsSuccess", data: response});
    });
  };
}

export function getFeeds(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/feeds";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getFeedsSuccess", data: response});
    });
  };
}

