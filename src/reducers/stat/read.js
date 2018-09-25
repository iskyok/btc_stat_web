let initialState = {
  data: {article_list: []},
  readData: {},
  readsData: {reads: [],meta: {}}
}
export default function stat_read(state = initialState, action) {
  switch (action.type) {
    case "getStatReadsIndexSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getReadDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        readData: action.data
      });
    default:
      return state;
  }
}
