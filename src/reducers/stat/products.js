let initialState = {
  data: {products: [],meta: {}},
  dashData: {}
}
export default function stat_products(state = initialState, action) {
  switch (action.type) {
    case "getStatProductsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getStatDashProductsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    default:
      return state;
  }
}
