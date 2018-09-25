let initialState = {
  data: {},
  readData: {},
  readsData: {reads: [],meta: {}}
}
export default function stat_interact(state = initialState, action) {
  switch (action.type) {
    case "getStatInteractsIndexSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getVisitDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        visitData: action.data
      });
    default:
      return state;
  }
}
