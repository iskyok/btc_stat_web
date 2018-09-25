import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getStatDashProducts(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/admin/stats/products/dashboard";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatDashProductsSuccess", data: response});
    });
  };
}

export function getStatProducts(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/company/products";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatProductsSuccess", data: response});
    });
  };
}

