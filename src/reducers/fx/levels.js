let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, levels: []},
  itemData: {created_at: ""}
}
export default function fx_levels(state = initialState, action) {
  switch (action.type) {
    case "getLevelsSuccess":
      let a=Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
      return  a;
    case "getLevelSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveLevelSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteLevelsSuccess":
      return Object.assign({}, state,{}
      );
    case "updateLevelsSuccess":
      return Object.assign({}, state,{}
    );
    case "openEditForm":
      return Object.assign({}, state, {
        edit_form_visible: action.visible
      });
    case "updateLevelRule":
      return Object.assign({}, state,{}
      );
    case "getLevelRule":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    default:
      return state;
  }
}

