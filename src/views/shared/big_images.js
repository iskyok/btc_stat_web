import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Form, Menu as MenuGroup, Upload, Modal, Button, Card, Icon, Carousel} from 'antd';
import {getUpToken, formItemLayout} from '../../utils/helper';
import {API_CONFIG} from '../../config/api';

import _  from 'lodash';

// maxImageLength 最大上传那图片数量 默认为3

export  default class SeeBigImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImageIndex: 0,
      imageList: []
    };
  }

  componentWillMount(){
    let images=this.convertImages(this.props.pics);
    this.setState({imageList: images})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.pics != this.props.pics) {
      let images=this.convertImages(nextProps.pics)
      this.setState({imageList: images})
    }
  }

  convertImages(pics){
    let images=[].concat(pics)
    return images
  }


  handleCancel() {
    this.setState({previewVisible: false})
  }

  onImgDragStart(e) {
    e.preventDefault()
  }

  onPreview(img, e) {
    e.preventDefault();
    let data = this.state.imageList;

    let changeIndex = _.indexOf(data, img);
    this.setState({
      previewImageIndex: changeIndex,
      previewVisible: true,
    });
  }

  render() {
    var that = this;
    const {previewVisible, imageList} = this.state;
    let show_img = {};
    return (
      <div className="single_upload inline">

        { imageList.map((item) => {
          return (!!!item ?
            <a className="show_big_img blank_img">
              <p>无图</p>
              <Icon type="eye-o" className="icon"/>
            </a> : <a  key={item} className="show_big_img" onClick={this.onPreview.bind(this, item)}>
            <img src={item + '-thumb'} className="show_img" style={show_img}/>
            <Icon type="eye-o" className="icon"/>
          </a>)
         })
        }
        <Modal visible={previewVisible}
               footer={null}
               onCancel={this.handleCancel.bind(this)}>
          <Carousel style={{width: '60%'}}
                    slickGoTo={this.state.previewImageIndex}
                    dots={true}
                    swipeToSlide={true}>
            {
              imageList.map((item) => {
                return (<span key={item}>
                                    <img style={{width: '100%'}} src={item + "-740"}
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
