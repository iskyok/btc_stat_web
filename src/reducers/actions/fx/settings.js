import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getSettingsSuccess(settings) {
  return {
    type: "getSettingsSuccess",
    isFetching: false,
    data: settings
  };
}

function requestSettings() {
  return {
  type: Settings,
  isFetching: true
};
}

function getSettingSuccess(data) {
  return {type: "getSettingSuccess", data: data, isFetching: true};
}

// export function getSettings(params = { page: 1, per_page: 10 }) {
//   return dispatch => {
////      let url=API_CONFIG.host + "";
     let url="/manage/data/fx/settings/index.json";
//     return cFetch(url, {
//       method: "GET",
//       params: {}
//     }).then((response) => {
//       dispatch(getSettingsSuccess(response));
//     });
//   };
// }

export function getSetting() {
  return (dispatch) => {
////    let url=API_CONFIG.host + "/api/admin/fx/settings";
     let url="/manage/data/fx/settings/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getSettingSuccess(response));
    });
  }
};


export function deleteSettings( id ,params) {
  // todo
////   let url=API_CONFIG.host + "/api/admin/explore/pages/" + id;
  let url="/manage/data/fx/settings/index.json";
  return (dispatch) => {
    return cFetch( url , {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(deleteSettingsSuccess(response));
    });
  }
};

export function saveSetting(params) {
////  let url= API_CONFIG.host + "/api/admin/fx/settings/";
   let url="/manage/data/fx/settings/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getSetting());
    });
  }
};

export function updateSetting(params) {
////  let url= API_CONFIG.host + "/api/admin/fx/settings/1";
   let url="/manage/data/fx/settings/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getSetting());
    });
  }
};
