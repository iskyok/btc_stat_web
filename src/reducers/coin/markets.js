let initialState = {
  data: {coins: [], meta: {}},
  itemData: {},
  dashData: {},
  countiesData: {contries: []},
  coinMarketsData:  {coins: [], meta: {}},
}
export default function coin_markets(state = initialState, action) {
  switch (action.type) {
    case "getMarketsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
      case "getMarketSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "getDashMarketsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    case "getAllMarketCountiesSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        countiesData: action.data
      });
    case "getCoinMarketsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        coinMarketsData: action.data
      });
    default:
      return state;
  }
}
