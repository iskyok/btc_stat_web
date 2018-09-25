let initialState = {
  data: {coins: [],meta: {}},
  dashData: {}
}
export default function coin_feeds(state = initialState, action) {
  switch (action.type) {
    case "getFeedsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getDashFeedsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    default:
      return state;
  }
}
