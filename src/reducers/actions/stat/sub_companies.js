import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';
import {browserHistory} from 'react-router';

function requestSubCompanies() {
  return {
    type: "requestSubCompanies",
    isFetching: true
  };
}

function getSubCompaniesSuccess(company) {
  return {
    type: "getSubCompaniesSuccess",
    isFetching: false,
    data: company
  };
}


function getSubCompaniesError(message) {
  return {
    type: "getSubCompaniesError",
    message
  };
}

export function getSubCompanies(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    dispatch(requestSubCompanies());
    let url=API_CONFIG.host + "/api/admin/stats/branch_companies/com_consume_profit";
    // let url="/manage/data/stat/sub_companies/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getSubCompaniesSuccess(response));
      return Promise.resolve(response);
    }).catch((err)=>{
      dispatch(getSubCompaniesError(err));
      return Promise.reject(err);
    });
  };
}

export function updateSubCompany(id, params) {

  let url=API_CONFIG.host+"/api/admin/company_users/" + id;

  //let url=API_CONFIG.host+"/api/admin/company_users/" + id;

  // let url="/manage/data/brands/show.json";
  return (dispatch) => {
    return cFetch( url, {
      method: "PUT",
      body: params
    }).then((response) => {
      browserHistory.goBack();
      // dispatch(getCompanies());
    });
  }
};



