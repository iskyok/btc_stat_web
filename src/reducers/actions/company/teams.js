import cFetch from '../../../utils/cFetch';
import {API_CONFIG} from '../../../config/api';
import {message} from 'antd';
import {browserHistory} from 'react-router';

function getTeamsSuccess(company) {
  return {
    type: "getTeamsSuccess",
    isFetching: false,
    data: company
  };
}

export function updateTeamSuccess(id, data) {
  return {
    type: "updateTeamSuccess",
    id: id,
    data: data
  }
}


function getTeamSuccess(data) {
  return {type: "getTeamSuccess", data: data, isFetching: true};
}


export function getTeams(params = {page: 1, per_page: 10}) {
  return dispatch => {
    let url = API_CONFIG.host + "/api/admin/company/teams";
    // let url="/manage/data/Teams/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getTeamsSuccess(response));
    });
  };
}

export function getTeamList(params = {page: 1, per_page: 10}) {
  return dispatch => {
    let url = API_CONFIG.host + "/api/admin/company/teams/list";
    // let url="/manage/data/Teams/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getTeamListSuccess", isFetching: false, data: response})
    });
  };
}


export function getTeam(id) {
  return (dispatch) => {

    let url = API_CONFIG.host + "/api/admin/company/teams/" + id;
//     let url="/manage/data/company/show.json";
    return cFetch(url, {
      method: "GET",
    }).then((response) => {
      dispatch(getTeamSuccess(response));
    });
  }
};

export function createTeam(params) {
  let url = API_CONFIG.host + "/api/admin/company/teams";
  // let url="/manage/data/brands/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getTeams());
    });
  }
};

export function updateTeam(id, params) {
  let url = API_CONFIG.host + "/api/admin/company/teams/" + id;
  // let url="/manage/data/brands/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response)=>{
      dispatch({type: "updateTeamSuccess" })
    })
  }
};

//添加成员
export function addMember(id, params) {
  let url = API_CONFIG.host + "/api/admin/company/teams/"+id+"/add_member";
  // let url="/manage/data/brands/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response)=>{
      dispatch({type: "addToTeamSuccess" })
    })
  }
};

//移除成员
export function removeMember(id, params) {
  let url = API_CONFIG.host + "/api/admin/company/teams/"+id+"/remove_member";
  // let url="/manage/data/brands/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response)=>{
      dispatch({type: "addToTeamSuccess" })
    })
  }
};



