import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUpToken} from '../../utils/helper';
import CustomTable from '../../components/CustomTable';
import {uploadSuccess} from '../../reducers/actions/images';
import ImagesUpload from './images_uploader';

import {Input, Form, Modal, Icon, Upload, Button, Popconfirm, Row, Col} from 'antd';
const FormItem = Form.Item;
var _=require("lodash");

export class _ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      imageUrl: "",
      visible: this.props.visible||true,
      fileList: [],
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible != this.props.visible) {
      this.setState({visible: nextProps.visible})
    }
  }
  handleClick(e) {
    console.log("eeeee", this.props)
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({fileList}) => this.setState({fileList})

  createGroup() {

  }

  componentDidMount() {
  }

  showModal(item) {
    this.setState({visible: true, itemId: item&& item.id});
  }

  hideModal() {
    this.setState({visible: false});
    if(this.props.onCancel){
      this.props.onCancel();
    }
  }
  //上传完毕处理
  handleUploadComplete(fileList) {
    this.setState({visible: false});
    if(this.props.onCancel){
      this.props.onCancel();
    }
    if(this.props.onSubmit){
      this.props.onSubmit(fileList)
    }
  }
  onChangeImageUrl(e){
    this.setState({imageUrl: e.target.value})
  }
  handleOk() {
    var fileList=_.map(this.state.fileList,function(item){
      return item.url
    });
    if(this.props.onConfirm){
      this.props.onConfirm(fileList)
    }
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    return (
      <Modal title="图片上传" visible={this.state.visible} onOk={this.handleOk.bind(this)}
             onCancel={this.hideModal.bind(this)}>
        <div className="clearfix">
          {/*<FormItem label="图片地址">*/}
            {/*<Input ref='imageUrl' type="text" onChange={this.onChangeImageUrl.bind(this)} autoComplete="off"/>*/}
          {/*</FormItem>*/}
          <ImagesUpload ref="imagesUpload" onAllUploadComplete={this.handleUploadComplete.bind(this)}></ImagesUpload>
        </div>
      </Modal>
    );
  }
}

//redux
function mapStateToProps(state) {
  return {data: state.images.uploadImages};
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAccount: (params) => {
      dispatch(deleteAccount(params)).then(() => {
        dispatch(getImages());
      });
    },
    getImages: (params) => {
      dispatch(getImages(params))
    },
    uploadSuccess: (params) => dispatch(uploadSuccess(params))
  };
}
let ImageUploaderModal = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(_ImageUploader);

export default ImageUploaderModal;
