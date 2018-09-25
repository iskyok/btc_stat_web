let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, applies: []},
  itemData: {}
}
export default function fx_applies(state = initialState, action) {
  switch (action.type) {
    case "getAppliesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getApplySuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveApplySuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteAppliesSuccess":
      return Object.assign({}, state,{}
      );
    case "updateAppliesSuccess":
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

