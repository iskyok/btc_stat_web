let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, companies: []},
  itemData: {},
  loading: false
}
export default function stat_sub_companies(state = initialState, action) {
  switch (action.type) {
    case "getSubCompaniesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        loading: false,
        data: action.data
      });
    case "requestSubCompanies":
      return Object.assign({}, state, {
        loading: action.loading || true
      });
    case "getSubCompaniesError":
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}
