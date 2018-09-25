import cFetch from '../../utils/cFetch';
import {API_CONFIG} from '../../config/api';
import {message} from 'antd';
import {browserHistory} from 'react-router';

function getMindIndexSuccess(mind) {
  return {
    type: "getMindIndexSuccess",
    isFetching: false,
    data: mind
  };
}

function requestMindIndex() {
  return {
    type: "requestMindIndex"
  };
}
function getMindIndexError() {
  return {
    type: "getMindIndexError"
  };
}


export function getMindIndex(params = {page: 1, per_page: 10}) {
  return dispatch => {
    dispatch(requestMindIndex())
    let url = API_CONFIG.host + "/api/company/mind_users";
    // let url="/manage/data/mind/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getMindIndexSuccess(response));
    }).catch(()=>{
      dispatch(getMindIndexError())
    });
  };
}

