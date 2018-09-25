import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getCitiesSuccess(data) {
  return {
    type: "getCitiesSuccess",
    isFetching: false,
    data: data
  };
}

function requestCities() {
  return {
  type: Cities,
  isFetching: true
};
}

function getCity2Success(data) {
  return {type: "getCity2Success", data: data, isFetching: true};
}
function getCity3Success(data) {
  return {type: "getCity3Success", data: data, isFetching: true};
}

export function getCities(params = { page: 1, per_page: 10 }) {
  return dispatch => {
////     let url=API_CONFIG.host + "/api/admin/manage/data/provinces";
    let url="/manage/data/location/cities/city1.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getCitiesSuccess(response));
    });
  };
}

export function getCity2(id) {
  return (dispatch) => {
    let url="/manage/data/location/cities/city2.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getCity2Success(response));
    });
  }
};
export function getCity3(id) {
  return (dispatch) => {
    let url="/manage/data/location/cities/city3.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getCity3Success(response));
    });
  }
};


export function deleteCities(params) {
  let url="/manage/data/location/cities/index.json";
  return (dispatch) => {
    return cFetch(API_CONFIG.host + "/api/admin/explore/pages/", {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(get(response));
    });
  }
};

export function saveCity(params) {
  let url="/manage/data/location/cities/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "POST",
      body: params
    }).then((response) => {
      dispatch(getCity());
    });
  }
};

export function updateCity(id, params) {
  let url="/manage/data/location/cities/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getCities());
    });
  }
};
