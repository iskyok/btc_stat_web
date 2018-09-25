import cFetch from '../../../utils/cFetch';
import { API_CONFIG } from '../../../config/api';
import { message } from 'antd';

function getTaxRatesSuccess(tax_rates) {
  return {
    type: "getTaxRatesSuccess",
    isFetching: false,
    data: tax_rates
  };
}
function deleteTaxRatesSuccess() {
  return {type: "deleteTaxRatesSuccess"};
}

function requestTaxRates() {
  return {
  type: TaxRates,
  isFetching: true
};
}

function getTaxRateSuccess(data) {
  return {type: "getTaxRateSuccess", data: data, isFetching: true};
}

export function getTaxRates(params) {
  return dispatch => {
     let url=API_CONFIG.host + "/api/admin/fx/tax_rates";
     //let url="/manage/data/fx/tax_rates/index.json";
    return cFetch(url, {
      method: "GET",
      params: params
    }).then((response) => {
      dispatch(getTaxRatesSuccess(response));
    });
  };
}
//
export function getTaxRate(id) {
  return (dispatch) => {
////     let url=API_CONFIG.host + "/api/admin/fx/tax_rates";
    let url="/manage/data/fx/tax_rates/show.json";
    return cFetch(url, {
      method: "GET",
      params: {}
    }).then((response) => {
      dispatch(getTaxRateSuccess(response));
    });
  }
};


export function deleteTaxRates(params) {
  let url="/manage/data/fx/tax_rates/index.json";
  return (dispatch) => {
    return cFetch(API_CONFIG.host + "/api/admin/explore/pages/", {
      method: "DELETE",
      body: params
    }).then((response) => {
      dispatch(deleteTaxRatesSuccess(response));
    });
  }
};
//
// export function saveTaxRate(params) {
   let url="/manage/data/fx/tax_rates/show.json";
//   return (dispatch) => {
//     return cFetch(url, {
//       method: "POST",
//       body: params
//     }).then((response) => {
//       dispatch(getTaxRate());
//     });
//   }
// };

export function updateTaxRate(id, params) {
  // todo url 修改
////   let url =API_CONFIG.host + "/api/admin/fx/tax_rates" + id;
  let url="/manage/data/fx/tax_rates/show.json";
  return (dispatch) => {
    return cFetch(url, {
      method: "PUT",
      body: params
    }).then((response) => {
      dispatch(getTaxRates());
    });
  }
};
