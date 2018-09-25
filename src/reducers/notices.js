let initialState = {
  data: {
    notices: [],
    meta: {
      "current_page": 1,
      "next_page": "",
      "prev_page": "",
      "total_pages": 1,
      "total_count": 6,
      "per_page": 10}
  },
  showData: [],
  itemData: {}
}
export default function notices(state = initialState, action) {
  switch (action.type) {
    case "getNoticesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getNoticeShowSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        showData: action.data
      });
    case "getNoticeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveNoticeSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteNoticeSuccess":
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

