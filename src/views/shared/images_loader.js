import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Form, Menu as MenuGroup, Upload, Modal, message, Card, Icon, Carousel} from 'antd';
import {getUpToken, formItemLayout} from '../../utils/helper';
import {API_CONFIG} from '../../config/api';

import _ from 'lodash';

// maxImageLength 最大上传那图片数量 默认为3
// fileSize 单个文件大小
export default class ImagesUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImageIndex: 0,
      fileList: [],
      errors: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultFileList != this.props.defaultFileList) {
      let newState = [];
      for (let item of nextProps.defaultFileList) {
        newState.push({
          uid: item.split("/").pop(),
          name: item.split("/").pop(),
          status: 'done',
          url: item + '-thumb',
          url_key: item.split("/").pop()
        });
      }
      this.setState({fileList: newState});
    }
  }

  validate() {
    if (this.props.required) {
      let minNumber = this.props.minNumber || 1;
      if (this.state.fileList.length < minNumber) {
        this.setState({error: "请至少上传" + minNumber + "张图片"})
        return false
      } else {
        this.setState({error: ""})
        return true
      }
    }
  }

  handleCancel() {
    this.setState({previewVisible: false})
  }

  onImgDragStart(e) {
    e.preventDefault();
  }

  render() {
    var that = this;
    const {previewVisible, previewImageIndex, fileList} = this.state;
    const uploadProps = {
      action: 'http://upload.qiniu.com',
      listType: 'picture-card',
      multiple: true,
      fileList: fileList,
      data: (file) => {
        let image_type = file.type.split("/")[1];
        var timestamp = (new Date()).valueOf();
        var key = timestamp + Math.random();
        file.postData["key"] = key + "." + image_type;
        return file.postData;
      },
      onChange: (info) => {
        let imgsData = []; //用于验证
        if (info.file.status === 'done') {
          let imageUrl = API_CONFIG.qiniu + "/" + info.file.response.key + "-thumb";
          var data = this.state.fileList;
          _.map(data, function (item) {
            if (info.file.uid == item.uid) {
              _.merge(item, {url: imageUrl, url_key: info.file.response.key})
            }
          })
          // 验证数据
          imgsData = data;
          // 传递数据；
          this.props.getbannerImgData === undefined ? null : this.props.getbannerImgData(this.state.fileList);
          this.setState({fileList: data})
        } else {
          // 验证数据
          imgsData = info.fileList;
          this.setState({fileList: info.fileList})
        }
        // 验证tip
        let error = '';
        if (this.props.required) {
          let minNumber = this.props.minNumber || 1;
          if (imgsData.length < minNumber) {
            error = "至少上传" + minNumber + "张图片";
          } else {
            error = ''
          }
        }
        if (imgsData.length > this.props.maxImageLength) {
          error = '最多上传' + this.props.maxImageLength + '张图片，请删除多余图片'
        } else {
          error = ''
        }
        this.setState({
          error: error
        })

      },
      onPreview: (file) => {
        let changeIndex = 0;
        let data = this.state.fileList;
        for (var i = 0; i < data.length; i++) {
          if (data[i].uid === file.uid) {
            changeIndex = i
          }
        }
        this.setState({
          previewImageIndex: changeIndex,
          previewVisible: true,
        });
      },
      beforeUpload(file) {
        //图片类型
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          message.error('文件格式不对，请选择png,jpg格式的文件');
        }

        // 图片大小
        let fileSize = that.props.fileSize || 3;
        let isLt2M = file.size / 1024 / 1024 < fileSize;
        if (!isLt2M) {
          message.error('图片过大，请选择小于' + fileSize + "M的文件");
        }
//不支持转换成变量
        return isLt2M && isJPG && new Promise(function (resolve) {
          let reader = new FileReader(file);
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            getUpToken().then(function (token) {
              let data = Object.assign(file, {
                postData: {token: token}
              });
              console.log('data ', data);
              resolve(data);
            })
          }
        })
      }
    };
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text" style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#666'
        }}> 上传图片
        </div>
      </div>

    );
    // 最大上传图片数量，默认为3
    let maxImageLength = this.props.maxImageLength || 3;

    return (
      <div className="single_upload ">
        <Upload  {...uploadProps}  >
          {fileList.length >= maxImageLength ? null : uploadButton}
        </Upload>

        {/*<div className="imgs_tip">{this.state.errors}</div>*/}
        {this.state.error ?
          <p className="error">{this.state.error}</p> : null
        }
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <Carousel style={{width: '60%', height: '60%'}}
                    slickGoTo={previewImageIndex}
                    dots={true}
                    swipeToSlide={true}>
            {
              fileList.map((item) => {
                let imageUrl = item.url ? item.url.replace("-thumb", "") : item.url
                return (<span key={item.uid}>
                                    <img style={{width: '100%'}} src={imageUrl}
                                         onDragStart={this.onImgDragStart.bind(this)}/>
                                    </span>)
              })
            }
          </Carousel>
        </Modal>
      </div>
    )
  }
}
