let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, users: []},
  loading:false
}
export default function mind (state = initialState, action) {
  switch (action.type) {
    case "getMindIndexSuccess":
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      });

    case "requestMindIndex":
      return Object.assign({}, state, {
        loading: true
      });

    case "getMindIndexError":
      return Object.assign({}, state, {
        loading: false,
        data:initialState["data"]
      });

    default:
      return state;
  }
}
