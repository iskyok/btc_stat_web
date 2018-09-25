import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

export function getConcepts(params) {
  return dispatch => {
    let url=API_CONFIG.host + "/api/feeds";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch({type: "getDashFeedsSuccess", data: response});
    });
  };
}

export function getAllConcepts() {
  return dispatch => {
    let url=API_CONFIG.host + "/api/concepts/all_concepts";
    // let url="/manage/data/stat/user/index.json";
    return cFetch(url, {
      method: "GET"
    }).then((response) => {
      dispatch({type: "getAllConceptsSuccess", data: response});
    });
  };
}

