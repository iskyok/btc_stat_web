let initialState = {
  data: {dates: [],area_list: [],user_list_sex: {}},
  dashData: {}
}
export default function stat_users(state = initialState, action) {
  switch (action.type) {
    case "getStatUserIndexSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getStatDashUserSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    case "getSexDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        sexData: action.data
      });
    default:
      return state;
  }
}
