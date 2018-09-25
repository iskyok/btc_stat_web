import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getStatDashTrades(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/admin/stats/shop_trades/dashboard";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatDashTradesSuccess", data: response});
    });
  };
}

export function getStatTrades(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/company/shop_trades/dashboard";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatTradesSuccess", data: response});
    });
  };
}

