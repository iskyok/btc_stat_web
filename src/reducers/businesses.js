let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, mind_shops: []},
  loading:false
}
export default function businesses (state = initialState, action) {
  switch (action.type) {
    case "getBusinessIndexSuccess":
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      });

    case "requestBusinessIndex":
      return Object.assign({}, state, {
        loading: true
      });

    case "getBusinessIndexError":
      return Object.assign({}, state, {
        loading: false,
        data:initialState["data"]
      });

    default:
      return state;
  }
}
