import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getTradesSuccess(trades) {
  return {
    type: "getTradesSuccess",
    isFetching: false,
    data: trades
  };
}

function requestTrades() {
  return {
  type: Trades,
  isFetching: true
};
}

function getTradeSuccess(data) {
  return {type: "getTradeSuccess", data: data, isFetching: true};
}

export function getTrades(params) {
  return dispatch => {
     let url=API_CONFIG.host + "/api/admin/fx/trades";
     //let url="/manage/data/fx/trades/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getTradesSuccess(response));
    });
  };
}

export function getTrade(id) {
  return (dispatch) => {
////    let url=API_CONFIG.host + "/api/admin/fx/trades/" + id +"/edit";
     let url="/manage/data/fx/trades/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getTradeSuccess(response));
    });
  }
};


export function deleteTrades(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/trades/destroy";
   let url="/manage/data/fx/trades/index.json";
  return (dispatch) => {
    return cFetch(url,{
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(getTrades());
    });
  }
};

export function saveTrade(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/trades";
   let url="/manage/data/fx/trades/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getTrade());
    });
  }
};

export function updateTrade(id, params) {
////  let url=API_CONFIG.host + "/api/admin/fx/trades/" + id ;
   let url="/manage/data/fx/trades/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getTrades());
    });
  }
};
