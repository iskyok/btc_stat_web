let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, tax_rates: []},
  itemData: {}
}
export default function fx_tax_rates(state = initialState, action) {
  switch (action.type) {
    case "getTaxRatesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getTaxRateSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveTaxRateSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteTaxRatesSuccess":
      return Object.assign({}, state,{
          itemData: {}
        }
      );
    case "updateTaxRatesSuccess":
      return Object.assign({}, state,{}
    );
    case "openEditForm":
      return Object.assign({}, state, {
        edit_form_visible: action.visible
      });
    default:
      return state;
  }
}

