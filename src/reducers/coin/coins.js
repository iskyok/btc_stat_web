let initialState = {
  data: {coins: [], meta: {}},
  itemData: {},
  dashData: {},
  filterData: {marketValueRanges: []},
  coinMarketsData: {market_coins: [],meta: {}}
}
export default function coin_coins(state = initialState, action) {
  switch (action.type) {
    case "getCoinsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        data: action.data
      });
    case "getDashCoinsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        dashData: action.data
      });
    case "getCoinSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "getCoinFiltersSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        filterData: action.data
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
