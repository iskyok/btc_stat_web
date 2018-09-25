import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getAppliesSuccess(applies) {
  return {
    type: "getAppliesSuccess",
    isFetching: false,
    data: applies
  };
}

function requestApplies() {
  return {
  type: Applies,
  isFetching: true
};
}

function getApplySuccess(data) {
  return {type: "getApplySuccess", data: data, isFetching: true};
}

export function getApplies(params = { page: 1, per_page: 10 }) {
  return dispatch => {
////    let url=API_CONFIG.host + "/api/admin/fx/users/apply";
     let url="/manage/data/fx/applies/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getAppliesSuccess(response));
    });
  };
}

export function getApply(id) {
  return (dispatch) => {
////    let url=API_CONFIG.host + "/api/admin/fx/users/" + id;
     let url="/manage/data/fx/applies/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getApplySuccess(response));
    });
  }
};


export function deleteApplies(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/users/" + params['id'];
   let url="/manage/data/fx/applies/index.json";
  return (dispatch) => {
    return cFetch( url, {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(deleteAppliesSuccess(response));
    });
  }
};

export function saveApply(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/users";
   let url="/manage/data/fx/applies/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getApply());
    });
  }
};

export function updateApply(id, params) {
////  let url=API_CONFIG.host + "/api/admin/fx/users/apply" + id;
   let url="/manage/data/fx/applies/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getApplies());
    });
  }
};
