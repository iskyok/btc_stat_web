import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getUsersSuccess(users) {
  return {
    type: "getUsersSuccess",
    isFetching: false,
    data: users
  };
}
function getChildrenSuccess(users) {
  return {
    type: "getUsersSuccess",
    isFetching: false,
    data: users
  };
}

function requestUsers() {
  return {
    type:"requestUsers",
  loading: true
};
}
function getUsersError() {
  return {
    type:"getUsersError",
    loading: false
  };
}

function getUserSuccess(data) {
  return {type: "getUserSuccess", data: data, isFetching: true};
}

export function getUsers(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    dispatch(requestUsers());
   let url=API_CONFIG.host + "/api/admin/fx/users";
//      let url="/manage/data/fx/users/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      console.log(response , "rrrrrrrrrrrrr999999999")
      dispatch(getUsersSuccess(response));
    }).catch((err)=>{
      dispatch(getUsersError());
    });
  };
}
export function getChildren(params = { page: 1, per_page: 10 }) {
  return dispatch => {
    dispatch(requestUsers());
   let url=API_CONFIG.host + "/api/admin/fx/users/"+params["id"]+"/children";
//      let url="/manage/data/fx/users/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getChildrenSuccess(response));
    }).catch((err)=>{
      dispatch(getUsersError());
    });
  };
}

export function getUser(id) {
  return (dispatch) => {
   let url=API_CONFIG.host + "/api/admin/fx/users/" + id;
     // let url="/manage/data/fx/users/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getUserSuccess(response));
    });
  }
};


export function deleteUsers(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/users/" + params['id'] + "/remove_relation";
   let url="/manage/data/fx/users/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "DELETE",
      body: params
    });
  }
};

export function moveRelationToUser(id,params) {
   let url=API_CONFIG.host + "/api/admin/fx/users/" + id + "/move_relation_to_user";
   // let url="/manage/data/fx/users/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response)=>{
      dispatch({type: "move_relation_to_user"});
    });
  }
};

export function moveRelationToCompany(id,params) {
   let url=API_CONFIG.host + "/api/admin/fx/users/" + id + "/move_relation_to_company";
   // let url="/manage/data/fx/users/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response)=>{
      dispatch({type: "move_relation_to_company"});
      return Promise.resolve(response)
    });
  }
};

export function moveRelationToSchool(id, params) {
   let url=API_CONFIG.host + "/api/admin/fx/users/" + id + "/move_relation_to_school";
   // let url="/manage/data/fx/users/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response)=>{
      dispatch({type: "move_relation_to_school"});
      return Promise.resolve(response)
    });
  }
};


//缺少新建 USER ,    修改分销关系-updateApply 更新分销商接口没有
export function saveUser(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/users";
   let url="/manage/data/fx/users/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getUser());
    });
  }
};

export function updateUser(id, params) {
////  let url=API_CONFIG.host + "/api/admin/fx/users/" + id;
   let url="/manage/data/fx/users/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getUsers());
    });
  }
};

