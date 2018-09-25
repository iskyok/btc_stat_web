let initialState = {
	data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, companies: []},
  allData: {companies: []},
	itemData: {}
}
export default function companies(state = initialState, action) {
	switch (action.type) {
		case "getCompaniesSuccess":
			console.log("4444444444111111111",action.data)
			return Object.assign({}, state, {
				isFetching: true,
				data: action.data
			});
			case "getAllCompaniesSuccess":
			return Object.assign({}, state, {
				isFetching: true,
        allData: action.data
			});
		case "getCompanySuccess":
			return Object.assign({}, state, {
				isFetching: true,
				itemData: action.data
			});
		case "clearCompanySuccess":
			return Object.assign({}, state, {
				itemData: initialState.itemData
			});
		case "updateCompanySuccess":
			_.map(state.data.companies,function(item) {
				if (action.id == item.id) {
					return _.merge(item, action.data)
				}
			})
			return Object.assign({}, state, {} );
		default:
			return state;
	}
}
