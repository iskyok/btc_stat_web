let initialState = {
  data: {dates: []},
  dashData: {}
}
export default function stat_trades(state = initialState, action) {
  switch (action.type) {
    case "getStatTradesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getStatDashTradesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    default:
      return state;
  }
}
