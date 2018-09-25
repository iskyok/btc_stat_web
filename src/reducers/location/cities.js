let initialState = {
  city1Data: [],
  city2Data: [],
  city3Data: []
}
export default function location_cities(state = initialState, action) {
  switch (action.type) {
    case "getCitiesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        city1Data: action.data
      });
    case "getCity2Success":
      return Object.assign({}, state, {
        isFetching: true,
        city2Data: action.data
      });
    case "getCity3Success":
      return Object.assign({}, state, {
        isFetching: true,
        city3Data: action.data
      });
    case "saveCitySuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteCitiesSuccess":
      return Object.assign({}, state,{}
      );
    case "updateCitiesSuccess":
      return Object.assign({}, state,{}
    );
    case "openEditForm":
      return Object.assign({}, state, {
        edit_form_visible: action.visible
      });
    default:
      return state;
  }
}

