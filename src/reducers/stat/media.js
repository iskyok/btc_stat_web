let initialState = {
  data: {}
}
export default function stat_media(state = initialState, action) {
  switch (action.type) {
    case "getStatMediaIndexSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getCityDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        cityData: action.data
      });
    case "getAgeDistributeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        ageData: action.data
      });
    default:
      return state;
  }
}
