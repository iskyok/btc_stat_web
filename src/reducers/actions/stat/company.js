import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getStatDashCompanies(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/admin/stats/branch_companies/dashboard";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatDashCompaniesSuccess", data: response});
    });
  };
}

export function getStatCompanies(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/company/branch_companies";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getStatCompaniesSuccess", data: response});
      console.log("response",response);
      return Promise.resolve(response);
    }).catch((err)=>{
      console.log("err====",err);
      return Promise.reject(err);
    });
  };
}

