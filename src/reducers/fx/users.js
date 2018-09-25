let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, users: []},
  itemData: {total_amount:0},
  loading:false
}
export default function fx_users(state = initialState, action) {
  switch (action.type) {
    case "requestUsers":
      return Object.assign({}, state, {
        loading: true
      });
    case "getUsersError":
      return Object.assign({}, state, {
        loading: false
      });
    case "getUsersSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        loading: false,
        data: action.data
      });
      // case "getChildrenSuccess":
      // return Object.assign({}, state, {
      //   isFetching: true,
      //   data: action.data
      // });
    case "getUserSuccess":
      console.log(action , "ssssssaction")
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveUserSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteUsersSuccess":
      return Object.assign({}, state,{}
      );
    case "updateUsersSuccess":
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

