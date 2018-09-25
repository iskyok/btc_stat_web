import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getCompanies(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/companies";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getCompaniesSuccess", data: response});
    });
  };
}

export function getCompany(id) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/companies/"+id;
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
    }).then((response) => {
      dispatch({type: "getCompanySuccess", data: response});
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

