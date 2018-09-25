let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, companies: []},
  listData: {meta: {per_page: 10, total_count: 0, total_pages: 0}, companies: []},
  itemData: {}
}
export default function company_teams(state = initialState, action) {
  switch (action.type) {
    case "getTeamsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getTeamSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
      case "getTeamListSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        listData: action.data
      });
    case "clearTeamSuccess":
      return Object.assign({}, state, {
        itemData: initialState.itemData
      });
    case "updateTeamSuccess":
      _.map(state.data.companies,function(item) {
        if (action.id == item.id) {
          return _.merge(item, action.data)
        }
      })
      return Object.assign({}, state, {} );
    default:
      return state;
  }
}
