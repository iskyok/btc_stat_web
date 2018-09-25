import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';
import {browserHistory} from 'react-router';

function requestCompanies() {
	return {
		type: "requestCompanies",
		isFetching: true
	};
}

function getCompaniesSuccess(company) {
	return {
		type: "getCompaniesSuccess",
		isFetching: false,
		data: company
	};
}

export function updateCompanySuccess(id,data) {
	return {
		type: "updateCompanySuccess",
		id: id,
		data: data
	}
}

function companyError(message) {
	return {
		type: company_FAILURE,
		isFetching: false,
		message
	};
}

export function getCompanies(params = { page: 1, per_page: 10 }) {
	return dispatch => {

		let url=API_CONFIG.host + "/api/admin/core/branch_companies";
		// let url="/manage/data/companies/index.json";
		return cFetch(url, {
			method: "GET",
			params: params
		}).then((response) => {
			dispatch(getCompaniesSuccess(response));
		});
	};
}

export function getAllCompanies(params) {
  return dispatch => {

    let url=API_CONFIG.host + "/api/admin/core/branch_companies/all";
    // let url="/manage/data/companies/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getAllCompaniesSuccess",data: response})
    });
  };
}

function getCompanySuccess(data) {

	return {type: "getCompanySuccess", data: data, isFetching: true};
}
export function getCompany(id) {
	return (dispatch) => {

		let url=API_CONFIG.host + "/api/admin/company_users/" + id;

		//let url=API_CONFIG.host + "/api/admin/company_users/" + id;

//     let url="/manage/data/company/show.json";
		return cFetch(url, {
			method: "GET",
		}).then((response) => {
			dispatch(getCompanySuccess(response));
		});
	}
};

export function updateCompany(id, params) {

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



