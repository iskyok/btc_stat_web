import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUpToken, formItemLayout} from '../../utils/helper';
import CustomTable from '../../components/CustomTable';
import ImageUploader from "../shared/image_uploader"
import ImageCheck from "../shared/image_check"
import {
  getImages,
  getGroups,
  saveGroup,
  checkedAllSuccess,
  checkedImageSuccess,
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

class ImageRegion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
  }

  componentDidMount() {
  }


  beforeUpload() {
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  image_check_model() {
    this.refs.imageCheckForm.getWrappedInstance().showModal()
  }

  handleChange = ({fileList}) => this.setState({fileList})

  handleCancel() {
    this.setState({previewVisible: false})
  }

  onConfirm(e, images) {
    //当前图片列表
    let currentImages = this.state.fileList;
    //新增图片类别
    _.each(images, function (item) {
      var file = {};
      file["uid"] = item.src
      file["url"] = item.src
      currentImages.push(file)
    });
    this.setState({fileList: currentImages})
    if (this.props.onConfirm) {
      this.props.onConfirm(currentImages)
    }
  }

  //图片列表转fileList
  convertFileListData(images) {
    let currentImages = [];
    _.each(images, function (item) {
      var file = {};
      file["uid"] = item
      file["url"] = item
      currentImages.push(file)
    });
    return currentImages;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pics !== undefined && this.props.pics != nextProps.pics) {
      this.setState({fileList: this.convertFileListData(nextProps.pics)})
    }
  }

  render() {
    let {data} = this.props;
    return (
      <div className="clearfix image_check">
        <div style={{float: "left"}}>
          <Upload ref="upload" style={{float: "right"}}
                  action="/upload.do"
                  listType="picture-card"
                  disabled={true}
                  fileList={this.state.fileList}
                  onPreview={this.handlePreview.bind(this)}
                  onChange={this.handleChange}
                  beforeUpload={this.beforeUpload}
          >
            {null}
          </Upload>
          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
            <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
          </Modal>
        </div>
        <Button onClick={this.image_check_model.bind(this)}> 选择图片 </Button>
        <ImageCheck ref="imageCheckForm" title="请选择图片" onConfirm={this.onConfirm.bind(this)}>
        </ImageCheck>
      </div>
    );
  }
}
export default ImageRegion;
