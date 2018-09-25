import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUpToken} from '../../utils/helper';
import CustomTable from '../../components/CustomTable';
import {uploadSuccess} from '../../reducers/actions/images';
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
      fileList: [{
        uid: -1111,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };

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
    this.setState({visible: true, itemId: item.id});
  }

  hideModal() {
    this.setState({visible: false});
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
  handleCancel = () => this.setState({ previewVisible: false })
  data(file) {
    return file.postData;
  }

  onChange(info) {
    if (info.file.status === 'done') {
      let imageUrl = "http://oi2gsetq3.bkt.clouddn.com/" + info.file.response.key + "-thumb";
      var data = this.state.fileList;
      _.map(data,function(item){
        if(info.file.uid==item.uid){
          _.merge(item,{url: imageUrl})
        }
      })
      this.setState({fileList: data})
    }else{
      this.setState({fileList: info.fileList})
    }
  }
  beforeUpload(file) {
    return new Promise(function (resolve) {
      let reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = (e)=> {
        getUpToken().then(function (token) {
          let data = Object.assign(file, {
            postData: {token: token}
          });
          resolve(data)
        })
      }
    })
  }

  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    return (
      <Modal title="图片上传" visible={this.state.visible} onOk={this.handleOk.bind(this)}
             onCancel={this.hideModal.bind(this)}>
        <div className="clearfix">
          <FormItem label="图片地址">
            <Input ref='imageUrl' type="text" onChange={this.onChangeImageUrl.bind(this)} autoComplete="off"/>
          </FormItem>
          <Upload
            action='http://upload.qiniu.com'
            listType='picture-card'
            fileList={fileList}
            multiple={true}
            beforeUpload={this.beforeUpload}
            data={this.data}
            onPreview={this.handlePreview.bind(this)}
            onChange={this.onChange.bind(this)}>
            <div>
              <Icon type="plus"/>
              <div className="ant-upload-text">上传</div>
            </div>
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
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
let ImageUploader = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {withRef: true}
)(_ImageUploader);

export default ImageUploader;
