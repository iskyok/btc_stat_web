import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getLevelsSuccess(levels) {
  return {
    type: "getLevelsSuccess",
    isFetching: false,
    data: levels
  };
}

function requestLevels() {
  return {
  type: Levels,
  isFetching: true
};
}

function getLevelSuccess(data) {
  return {type: "getLevelSuccess", data: data, isFetching: true};
}

export function getLevels(params) {
  return dispatch => {
   let url=API_CONFIG.host + "/api/admin/fx/levels";
//     let url="/manage/data/fx/levels/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getLevelsSuccess(response));
    });
  };
}

export function getLevel(id) {
  return (dispatch) => {
     let url="/manage/data/fx/levels/show.json";
////    let url=API_CONFIG.host + "/api/admin/fx/levels/"+ id;
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getLevelSuccess(response));
    });
  }
};


export function deleteLevels(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/levels/destroy";
   let url="/manage/data/fx/levels/index.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(getLevels());
    });
  }
};

export function saveLevel(params) {
////  let url=API_CONFIG.host + "/api/admin/fx/levels";
   let url="/manage/data/fx/levels/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getLevels());
    });
  }
};

export function updateLevel(id, params) {
////  let url=API_CONFIG.host + "/api/admin/fx/levels/"+id;
   let url="/manage/data/fx/levels/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getLevels());
    });
  }
};

export function getLevelRule(id) {
  return (dispatch) => {
////    let url=API_CONFIG.host + "/api/admin/fx/upgrades/1/edit";
     let url="/manage/data/fx/levels/rules/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getLevelSuccess(response));
    });
  }
};
export function updateLevelRule(id, params) {
////  let url=API_CONFIG.host + "/api/admin/fx/upgrades/1";
   let url="/manage/data/fx/levels/rules/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getLevels());
    });
  }
};
