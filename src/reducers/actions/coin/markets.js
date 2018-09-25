import cFetch from '../../../utils/cFetch';
import {API_CONFIG} from '../../../config/api';
import {message} from 'antd';

export function getDashMarkets(params) {
  return dispatch => {
    let url = API_CONFIG.host + "/api/markets";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getDashMarketsSuccess", data: response});
    });
  };
}

export function getMarkets(params) {
  return dispatch => {
    let url = API_CONFIG.host + "/api/markets";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getMarketsSuccess", data: response});
    });
  };
}

export function getMarket(id) {
  return dispatch => {
    let url = API_CONFIG.host + "/api/markets/"+id;
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET"
    }).then((response) => {
      dispatch({type: "getMarketSuccess", data: response});
    });
  };
}

export function getCoinMarkets(id,params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/markets/"+id+"/market_exchanges";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getCoinMarketsSuccess", data: response});
    });
  };
}

export function getAllCounties(params) {
  return dispatch => {
    let url = API_CONFIG.host + "/api/markets/all_counties";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getAllMarketCountiesSuccess", data: response});
    });
  };
}

