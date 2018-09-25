let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, trades: []},
  itemData: {id:1}
}
export default function fx_trades(state = initialState, action) {
  switch (action.type) {
    case "getTradesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getTradeSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveTradeSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
    case "deleteTradesSuccess":
      return Object.assign({}, state,{}
      );
    case "updateTradesSuccess":
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

