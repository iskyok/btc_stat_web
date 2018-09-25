let initialState = {
  data: {companies: [], meta: {}},
  dashData: {},
  itemData: {companies: []}
}
export default function coin_companies(state = initialState, action) {
  switch (action.type) {
    case "getCompaniesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getCompanySuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    default:
      return state;
  }
}
