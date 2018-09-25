let initialState = {
  data: {concepts: [], meta: {}},
  dashData: {},
  allData: {concepts: []}
}
export default function coin_concepts(state = initialState, action) {
  switch (action.type) {
    case "getConceptsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getDashConceptsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    case "getAllConceptsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        allData: action.data
      });
    default:
      return state;
  }
}
