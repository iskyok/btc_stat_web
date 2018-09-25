import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getDashCoins(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/coins/dash_coins";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getDashCoinsSuccess", data: response});
    });
  };
}

export function getCoins(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/coins/all_coins";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getCoinsSuccess", data: response});
    });
  };
}

export function getCoin(id) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/coins/"+id;
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
    }).then((response) => {
      dispatch({type: "getCoinSuccess", data: response});
    });
  };
}

export function getCoinFilters(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/coins/all_filter";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getCoinFiltersSuccess", data: response});
    });
  };
}

export function getCoinMarkets(id,params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/coins/"+id+"/market_exchanges";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getCoinMarketsSuccess", data: response});
    });
  };
}

