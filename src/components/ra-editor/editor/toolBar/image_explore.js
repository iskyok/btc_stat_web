import React, {Component} from 'react';
import {
  Upload,
  Modal,
  Button,
  Popconfirm,
  Form,
  Input,
  message,
  Tooltip,
  Icon
} from 'antd';
import ImageCheck from '../../../../views/shared/image_check';
/*视频音频图片*/
class ImageExploreControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      images: [],
      loadingRemoteImageFun: null
    };
    this.successedCount = 0;

    this.onImgToggle = this.onImgToggle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

  }
  handleConfirm(pictureList) {
    if (!pictureList.length) {
      console.log("return false", pictureList.lenght);
      return false;
    }
    let images = pictureList.map(item => {
      return {"key": item.file_key,"url": item.file_url};
    })
    this.props.receiveImage(images);
    this.forceUpdate();
  }

  onImgToggle() {
    this.setState({visible: true, disabled: true, images: []});
  }

  handleCancel(e) {
    this.setState({visible: false, images: []});
  }

  render() {
    let className = 'RichEditor-styleButton';
    let that = this;
    return (
      <div className="RichEditor-controls">
        <span className={className} onClick={that.onImgToggle}>
          <Tooltip placement="top" title="图片库">
            <Icon type="editor_image"/>
          </Tooltip>
        </span>
        {this.state.visible ? <ImageCheck multiple={true} forEditor={true} onConfirm={this.handleConfirm}  onCancel={this.handleCancel.bind(this)}></ImageCheck> : null}
      </div>
    )
  }
}
ImageExploreControls.propTypes = {
  receiveImage: React.PropTypes.func.isRequired
};

ImageExploreControls.defaultProps = {};
module.exports = ImageExploreControls;
