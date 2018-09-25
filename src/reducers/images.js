var _=require("lodash");
let initialState = {
  data: {meta: {per_page: 10, total_count: 0, total_pages: 0}, images: []},
  groupsData: {groups: []},
  uploadImages: [],
  itemData: {}
}
export default function images(state = initialState, action) {
  switch (action.type) {
    case "getImagesSuccess":
      let data=action.data
      return Object.assign({}, state, {
        isFetching: true,
        data: data
      });
    case "getImageSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        itemData: action.data
      });
    case "saveImageSuccess":
      return Object.assign({}, state, {
        itemData: action.data
      });
      case "getGroupsSuccess":
      return Object.assign({}, state, {
        isFetching: true,
        groupsData: action.data
      });
    case "saveGroupSuccess":
    return Object.assign({}, state, {
      groupItemData: action.data
    });

    case "deleteImagesSuccess":
      return Object.assign({}, state,{}
      );
    case "updateImageSuccess":
      _.map(state.data.images,function(item) {
        if (action.id == item.id) {
          return _.merge(item, action.data)
        }
      })
      return Object.assign({}, state, {} );
    case "checkedImageSuccess":
      _.map(state.data.images,function(item) {
        if (action.id == item.id) {
          return _.merge(item, {checked: !!!item.checked})
        }
      })
      return Object.assign({}, state, {} );
    case "checkedAllSuccess":
      _.map(state.data.images,function(item) {
          return _.merge(item, {checked: action.checkedAll})
      })
      return Object.assign({}, state, {} );
    case "unCheckedAllSuccess":
      _.map(state.data.images,function(item) {
          return _.merge(item, {checked: false})
      })
      return Object.assign({}, state, {} );
    case "openEditForm":
      return Object.assign({}, state, {
        edit_form_visible: action.visible
      });
    case "uploadSuccess":
      return state.uploadImages.push(action.data)
      // return Object.assign({}, state, {
      //   uploadImages: action.data
      // });
    default:
      return state;
  }
}

