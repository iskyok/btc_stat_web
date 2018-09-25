let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, invites: []},
  itemData: {}
}
export default function fx_invites(state = initialState, action) {
  switch (action.type) {
    case "getInvitesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getInviteSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveInviteSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteInvitesSuccess":
      return Object.assign({}, state,{}
      );
    case "updateInvitesSuccess":
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

