import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUpToken, formItemLayout} from '../../utils/helper';
import CustomTable from '../../components/CustomTable';
import ImageUploader from "../shared/image_uploader"
import {
  getImages,
  getGroups,
  saveGroup,
  checkedAllSuccess,
  checkedImageSuccess,
  unCheckedAllSuccess,
  saveImage
} from '../../reducers/actions/images';
import {Input, Form, Menu as MenuGroup, Upload, Modal, Button, Card, Icon, Checkbox} from 'antd';
const FormItem = Form.Item;
const MenuItemGroup = MenuGroup.ItemGroup;
var _ = require("lodash");


// 点击图片，调用updateImage()方法，通知后台更改选中状态 value的值
// BUG： 分组不能选中该组的内容
//文件思路：ImageRegion 总的，有显示列表的图片，和选中图片的弹窗
// 图片弹窗 ImageCheckForm ，一个二级菜单，显示当前分组，一个显示图片的容器。
//显示图片的容器 ImgContent ，遍历生成图片单项
//    如果设置全选按钮，应该在这一级 ImgContent 。每次点击都要触发这个事件
//图片单项 ImageItem   生成各个图片


class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      checked: false
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    });
  }


  onClickHandle(id) {
    console.log(id, this.props, "rrrrdasdrrrrrrr")
    this.props.onsetRenter();
    this.setState({
      checked: !this.state.checked,
      count: this.props.renderItem + 1
    });
    console.log(this.props, "sddddddddddddddddd")
    this.props.checkedImageSuccess(id);
  }

  render() {
    let {imgItemSrc, imageItemChecked, imageItemName, imgItemId} = this.props;
    // console.log("fffffffffffffffrrrrrrrrreeeeeeeee" ,imgItemSrc ,imageItemChecked , imageItemName )
    return (
      <Card style={{"width": "160px"}} bodyStyle={{"padding": "0"}}>
        <div className="custom-image" onClick={this.onClickHandle.bind(this, imgItemId)}>
          <img src={imgItemSrc} alt=""/>
          <p className="image_check_name">{ imageItemName }</p>
          { imageItemChecked ? <div className="image_check_Icon"><Icon type="plus-square"/></div> : null}
        </div>
      </Card>

    )
  }
}

class ImgContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PopVisible: false
    };
  }

  render() {
    let {data, menuKey} = this.props;
    return (
      <div>
        {data.images.map(item=>
          <ImageItem
            imgItemSrc={item.src}
            imgItemId={item.id}
            imageItemName={item.name}
            imageItemChecked={item.checked}
            data={data}
            checkedImageSuccess={this.props.checkedImageSuccess}
            onsetRenter={this.props.onsetRenter}
            renderItem={this.props.renderItem}
          />
        )}
      </div>
    )
  }
}


class ImageCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Menu_current: "default",
      renderItem: 1,
      imageList: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
      visible: false
    };
  }

  componentDidMount() {
    this.props.getImages();
    this.props.getGroups();
  }

  // 点击二级导航，分组导航
  handleClick(e) {
    this.setState({
      Menu_current: e.key,
    });
    console.log(this.props, "ssssssssssddddddddddddddddd")
    this.props.getImages(e.key);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  hideModal() {
    this.setState({visible: false});
    this.props.unCheckedAll();
  }

  image_check_model() {
    console.log(this, this.refs.imageCheckForm, "this.props.getImages(),sdasbadbbbbbbbb")
    this.refs.imageCheckForm.showModal()
  }

  onsetRenter() {
    this.setState({
      count: this.state.count + 1
    })
  }

  beforeUpload() {
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleOk(e) {
    var selectedImages = _.filter(this.props.data.images, function (item) {
      return item.checked == true
    });
    var file = {};
    if(this.props.onConfirm){
      this.props.onConfirm(e,selectedImages)
    }
    this.hideModal()
    this.props.unCheckedAll();
  }

  handleChange = ({fileList}) => this.setState({fileList})
  handleCancel(){
    this.setState({previewVisible: false})
  }


  //全选按钮事件
  onChange(e) {
    console.log('checkedAll = ', e.target.checked, this.state);
    this.setState({
      checkedAll: e.target.checked,
      renderItem: this.state.renderItem + 1
    });
    //已经执行这个ALL的 ACTION
    this.props.checkedAllSuccess(e.target.checked);
  }

  upload() {
    this.refs.imageUploader.getWrappedInstance().setState({visible: true})
  }

  uploadConfirm(fileList) {
    this.props.getImages();
    this.refs.imageUploader.getWrappedInstance().setState({visible: false})
  }
  render() {
    let {data, groupsData} = this.props;
    return (
      <div>
        <Modal className=" clearfix" wrapClassName="image_check_modal" width="1000" title={this.props.title}
               visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.hideModal.bind(this)}>
          <div className="menu">
            <MenuGroup
              onClick={this.handleClick.bind(this)}
              style={{width: 240}}
              selectedKeys={this.state.Menu_current}
              mode="inline"
            >
              <MenuItemGroup title="我的分组">
                {
                  groupsData.groups.map(menu_item=>
                    <MenuGroup.Item key={menu_item.key}>
                      { menu_item.name }
                    </MenuGroup.Item>
                  )
                }
              </MenuItemGroup>
            </MenuGroup>
          </div>
          <div className="image_group">
            <div className="image_content_tool clearfix">
              <Checkbox className="check_all"
                        checked={this.state.checkedAll}
                        onChange={this.onChange.bind(this)}
              >
                全选
              </Checkbox>
              <Button type="primary" onClick={this.upload.bind(this)}>上传图片</Button>
            </div>
            <ImgContent
              data={data}
              menuKey={this.state.Menu_current}
              checkedImageSuccess={this.props.checkedImageSuccess}
              onsetRenter={this.onsetRenter.bind(this)}
              renderItem={this.state.renderItem}
            />
          </div>
        </Modal>
        <ImageUploader ref="imageUploader" visible={this.state.showUpload}
                       onConfirm={this.uploadConfirm.bind(this)}></ImageUploader>
      </div>
    );
  }
}


//redux
function mapStateToProps(state) {
  return {data: state.images.data, groupsData: state.images.groupsData};
}

function mapDispatchToProps(dispatch) {
  return {
    getImages: (params) => {
      dispatch(getImages(params))
    },
    getGroups: (params) => {
      dispatch(getGroups())
    },
    saveGroupItemData: (params)=> {
      dispatch(saveGroup(params)).then(()=> {
        dispatch(getGroups())
      })
    },
    checkedImageSuccess: (id)=> {
      dispatch(checkedImageSuccess(id))
    },
    checkedAllSuccess: (checkedAll)=> {
      dispatch(checkedAllSuccess(checkedAll))
    },
    unCheckedAll: ()=> {
      dispatch(unCheckedAllSuccess())
    },
    saveImage: (params)=> {
      dispatch(saveImage(params)).then(()=> {
        dispatch(getImages())
      })
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ImageCheck);
