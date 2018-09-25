let initialState = {
  data: []
}
export default function echarts(state = initialState, action) {
  switch (action.type) {
    case "getEchartsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    // case "getSpecSuccess":
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     itemData: action.data
    //   });
    default:
      return state;
  }
}
