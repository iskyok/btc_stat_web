let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, businesses: []},
  itemData: {},
  address: {address:[]},
  categories: {categories_list:[]},
  surveyData:{shop_info:{ship_count:"",return_count:"",ytd_count:"",ytd_price:"",sum_price:""}},
  headerData:{ship_count:"",return_count:"",ytd_count:"",ytd_price:"",sum_price:""}
}
export default function business(state = initialState, action) {
  switch (action.type) {
    case "getBusinessesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getBusinessSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "getSurveySuccess":
      return Object.assign({}, state, {
        isFetching: true,
        surveyData: action.data
      });
    case "clearBusinessSuccess":
      return Object.assign({}, state, {
        itemData: initialState.itemData
      });
    case "getAddressSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        address: action.data
      });
    case "getCategoriesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        categories: action.data
      });
    case "getHomeHeaderSuccess":
      return Object.assign({}, state, {
        headerData: action.data
      });
    case "updateBusinessSuccess":
      _.map(state.data.businesses,function(item) {
        if (action.id == item.id) {
          return _.merge(item, action.data)
        }
      })
      return Object.assign({}, state, {} );
    default:
      return state;
  }
}
