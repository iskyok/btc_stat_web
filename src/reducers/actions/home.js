// home 页面 显示的数据获取接口

import { USERS_QERUEST, USERS_SUCCESS, USERS_FAILURE} from '../../constants/actionTypes';
import cFetch from '../../utils/cFetch';
import { API_CONFIG } from '../../config/api';
import { message } from 'antd';
import { push } from 'react-router-redux';

function requestBusinesses() {
  return {
    type: "requestBusinesses",
    isFetching: true
  };
}

function getBusinessesSuccess(users) {
  return {
    type: "getBusinessesSuccess",
    isFetching: false,
    data: users
  };
}

export function updateBusinessSuccess(id,data) {
  return {
    type: "updateBusinessSuccess",
    id: id,
    data: data
  }
}

function usersError(message) {
  return {
    type: USERS_FAILURE,
    isFetching: false,
    message
  };
}

export function getBusinesses(params = { page: 1, per_page: 10 }) {
  return dispatch => {
//    // let url=API_CONFIG.host + "/api/admin/explore/users";
    let url="/mind/data/users/index.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getBusinessesSuccess(response));
    });
  };
}

// function getBusinessSuccess(data) {
//   return {type: "getBusinessSuccess", data: data, isFetching: true};
// }
// export function getBusiness(id) {
//   return (dispatch) => {
//    let url=API_CONFIG.host + "/api/mind/shops/" + id ;
//      // let url="/mind/data/business/show.json";
//     return cFetch(url, {
//       method: "GET",
//       params: {}
//     }).then((response) => {
//       dispatch(getBusinessSuccess(response));
//     });
//   }
// };

//概况图
function getSurveySuccess(data) {
  return {type: "getSurveySuccess", data: data, isFetching: true};
}
export function getSurvey() {
  return (dispatch) => {
    let url=API_CONFIG.host + "/api/company/shop_trades/dashboard";

    // let url="/mind/data/business/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getSurveySuccess(response));
    });
  }
};

//概况头部
function getHomeHeaderSuccess(data) {
  return {type: "getHomeHeaderSuccess", data: data, isFetching: true};
}
export function getHomeHeader() {
  return (dispatch) => {
    let url=API_CONFIG.host + "/api/company/dashboards";

    // let url="/mind/data/business/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      console.log("5555555---55555",response)
      dispatch(getHomeHeaderSuccess(response));
    });
  }
};

export function updateBusiness(id, params) {
    let url=API_CONFIG.host+"/mind/data/business/show";
  //let url="/mind/data/brands/show.json";
  return (dispatch) => {
    return cFetch( url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getBusinesses());
    });
  }
};

export function saveBusiness(params ,supply) {
//   let url="";
  console.log(supply , !!supply,!!'',!!undefined ,"111111111111111111111111")
  let url = API_CONFIG.env == "local" ? "/mind/data/brands/show.json" : API_CONFIG.host + "/api/mind/business_users";
  if (!!supply){
    url = API_CONFIG.host + "/api/mobile/sessions/create_business";
  }
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getBusinesses());
      if (!!supply){
        dispatch(push("/mind/supply_result"))
      }else{
        dispatch(push("/manage_mind"))
        // setTimeout('dispatch(push("/manage_mind"))',5000)
      }
    });
  }
};

function clearItemDataSuccess() {
  return {
    type: "clearBusinessSuccess"
  };
}
export  function clearBusiness() {
  return (dispatch) => {
    dispatch(clearItemDataSuccess())
  }
}

function getAddressSuccess(data) {
  return {type: "getAddressSuccess", data: data, isFetching: true};
}
export function getAddress() {
  return (dispatch) => {
    let url=API_CONFIG.host + "/api/mobile/contacts/address" ;
    // let url="/mind/data/business/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getAddressSuccess(response));
    });
  }
};

function getCategoriesSuccess(data) {
  return {type: "getCategoriesSuccess", data: data, isFetching: true};
}
export function getCategories() {
  return (dispatch) => {
    let url=API_CONFIG.host + "/api/mobile/store/categories" ;
    // let url="/mind/data/business/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getCategoriesSuccess(response));
    });
  }
};

export function newStore(param ,supply) {
  return (dispatch) => {
    let url=API_CONFIG.host + "/api/mind/stores" ;
    // let url="/mind/data/business/show.json";
    if (!!supply){
      url = API_CONFIG.host + "/api/mobile/sessions/create_store";
    }
    return cFetch(url, {
      method: "POST",
      body: param
    }).then((response) => {
      dispatch(getBusinesses());
      if (!!supply){
        dispatch(push("/mind/supply_result"))
      }else{
        dispatch(push("/manage_mind"))
        // setTimeout('dispatch(push("/manage_mind"))',5000)
      }
    });
  }
};

export function modifyStore(param ,supply) {
  console.log("----------==[[",param.store.id)
  return (dispatch) => {
    let url=API_CONFIG.host + "/api/mind/stores/" + param.store.id ;
    // let url="/mind/data/business/show.json";
    return cFetch(url, {
      method: "PUT",
      body: param
    }).then((response) => {
      dispatch(getBusinesses());
      if (!!supply){
        dispatch(push("/mind/supply_result"))
      }else{
        dispatch(push("/manage_mind"))
        // setTimeout('dispatch(push("/manage_mind"))',5000)
      }
    });
  }
};
