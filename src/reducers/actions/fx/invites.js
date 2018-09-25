import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getInvitesSuccess(invites) {
  return {
    type: "getInvitesSuccess",
    isFetching: false,
    data: invites
  };
}

function requestInvites() {
  return {
  type: Invites,
  isFetching: true
};
}

function getInviteSuccess(data) {
  return {type: "getInviteSuccess", data: data, isFetching: true};
}

export function getInvites(params = { page: 1, per_page: 10 }) {
  return dispatch => {
     let url=API_CONFIG.host + "/api/admin/fx/invites";
     //let url="/manage/data/fx/invites/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getInvitesSuccess(response));
    });
  };
}

export function getInvite(id) {
  return (dispatch) => {
////     let url=API_CONFIG.host + "";
    let url="/manage/data/fx/invites/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getInviteSuccess(response));
    });
  }
};


export function deleteInvites(params) {
////   let url=API_CONFIG.host + "";
  let url="/manage/data/fx/invites/index.json";
  return (dispatch) => {
    return cFetch( url , {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(deleteInvitesSuccess(response));
    });
  }
};

export function saveInvite(params) {
////   let url=API_CONFIG.host + "";
  let url="/manage/data/fx/invites/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getInvite());
    });
  }
};

export function updateInvite(id, params) {
////   let url=API_CONFIG.host + "";
  let url="/manage/data/fx/invites/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getInvites());
    });
  }
};
