let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, settings: []},
  itemData: {}
}
export default function fx_settings(state = initialState, action) {
  switch (action.type) {
    case "getSettingsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getSettingSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveSettingSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteSettingsSuccess":
      return Object.assign({}, state,{}
      );
    case "updateSettingsSuccess":
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

