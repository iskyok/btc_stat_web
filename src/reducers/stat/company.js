let initialState = {
  data: {
    company: {
      id: '',
      name: '',
      shop_trades_count: '',
      shop_trades_amount: '',
      products_count: "",
      users_count: '',
      mind_users_count: '',
      mind_shops_count:''
    }
  },
  dashData: {}
};
export default function stat_companies(state = initialState, action) {
  switch (action.type) {
    case "getStatCompaniesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getStatDashCompaniesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    default:
      return state;
  }
}
