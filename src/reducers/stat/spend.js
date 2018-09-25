let initialState = {
  data: {order_list: []},
  readsData: {reads: [],meta: {}}
}
export default function stat_spend(state = initialState, action) {
  switch (action.type) {
    case "getStatSpendsIndexSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getSpendDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        spendData: action.data
      });
    case "getAgeDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        ageData: action.data
      });
    default:
      return state;
  }
}
