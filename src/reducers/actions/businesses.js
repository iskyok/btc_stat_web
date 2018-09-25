 // 厂家管理 数据
import cFetch from '../../utils/cFetch';
import {API_CONFIG} from '../../config/api';
import {message} from 'antd';
import {browserHistory} from 'react-router';

function getBusinessIndexSuccess(mind) {
  return {
    type: "getBusinessIndexSuccess",
    isFetching: false,
    data: mind
  };
}

function requestBusinessIndex() {
  return {
    type: "requestBusinessIndex"
  };
}
function getBusinessIndexError() {
  return {
    type: "getBusinessIndexError"
  };
}


export function getBusinessIndex(params = {page: 1, per_page: 10}) {
  return dispatch => {
    dispatch(requestBusinessIndex())
    let url = API_CONFIG.host + "/api/company/mind_shops";
    // let url="/manage/data/business/business.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getBusinessIndexSuccess(response));
    }).catch(()=>{
      dispatch(getBusinessIndexError())
    });
  };
}

