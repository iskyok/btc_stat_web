import cFetch from '../../utils/cFetch';
import { API_CONFIG } from '../../config/api';
import { message } from 'antd';

function getImagesSuccess(data) {
  return {
    type: "getImagesSuccess",
    isFetching: false,
    data: data
  };
}
function getGroupsSuccess(data) {
  return {
    type: "getGroupsSuccess",
    isFetching: false,
    data: data
  }
}

export function checkedImageSuccess(id) {
  return {
    type: "checkedImageSuccess",
    id: id
  }
}

export function checkedAllSuccess(checkedAll) {
  return {
    type: "checkedAllSuccess",
    checkedAll: checkedAll
  }
}
export function unCheckedAllSuccess() {
  return {
    type: "unCheckedAllSuccess",
  }
}
export function updateImageSuccess(id,data) {
  return {
    type: "updateImageSuccess",
    id: id,
    data: data
  }
}

function requestImages() {
  return {
    type: Images,
    isFetching: true
  };
}

function getImageSuccess(data) {
  return {type: "getImageSuccess", data: data, isFetching: true};
}

export function getImages(params) {
  return dispatch => {
////     let url=API_CONFIG.host + "/api/admin/images";
    let url="/manage/data/images/index.json";
    //  ../三次，返回到manage/这一级
    return cFetch(url, {
      method: "GET",
      params: {id:1}
    }).then((response) => {
      dispatch(getImagesSuccess(response));
    })
  }
}
export function updateImage(rename, params) {
////   let url=API_CONFIG.host + "/api/admin/images/74";
  let url="/manage/data/images/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then(() => {
      dispatch(getImages());
    });
  }
}
export function getGroups() {
  return dispatch => {
////     let url=API_CONFIG.host + "/api/admin/images";
    let url="/manage/data/images/groups.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getGroupsSuccess(response));
    })
  }
}

export function getImage(id) {
  return (dispatch) => {
////     let url=API_CONFIG.host + "/api/admin/images/74/edit";
    let url="/manage/data/images/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getImageSuccess(response));
    });
  }
}
export function getGroup(id) {
  return (dispatch) => {
////     let url=API_CONFIG.host + "/api/admin/images/74/edit";
    let url="/manage/data/images/groups.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getGroupsSuccess(response));
    })
  }
}


export function deleteImages(params) {
////   let url=API_CONFIG.host + "/api/admin/images/74/delete";
  let url="/manage/data/images/index.json";
  return (dispatch) => {
    return cFetch(API_CONFIG.host + "/api/admin/explore/pages/", {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(deleteImagesSuccess(response));
    })
  }
}

export function saveImage(params) {
////   let url=API_CONFIG.host + "/api/admin/images";
  let url="/manage/data/images/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getImages());
    })
  }
}
export function saveGroup(params) {
////   let url=API_CONFIG.host + "/api/admin/images";
  let url="/manage/data/images/groups.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getGroup());
    });
  }
}
export function uploadSuccess(params) {
////   let url=API_CONFIG.host + "/api/admin/images";
   let url="/manage/data/images/groups.json";
  return {
    type: "uploadSuccess",
    data: params
  }
}


