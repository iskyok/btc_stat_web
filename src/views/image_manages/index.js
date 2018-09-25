import React from 'react';
import {connect} from 'react-redux';

import CustomTable from './../../components/CustomTable';
import {getImages , getGroups ,saveGroup,updateImage ,checkedAllSuccess,checkedImageSuccess} from '../../reducers/actions/images';
import {Input, Card, Checkbox, Radio, Button, Popover, Menu as MenuGroup} from 'antd';

const RadioGroup = Radio.Group;
const MenuItemGroup = MenuGroup.ItemGroup;
var moment = require('moment');
import ImageUploader from "../shared/image_uploader"


// 缺少 全选, 上传组件

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MovePopVisible: false,
      CopyPopVisible: false,
      DeletePopVisible: false,
      RenamePopVisible: false,
      value: 1,
      count:this.props.renderItem + 1
    };
  }

  componentDidMount() {
  }

  onChange(Item_name , item_data ,imgItem_Id) {
    console.log("我选中了这个图片",Item_name , item_data)
    this.setState({
      count : this.props.renderItem + 1
    })
    this.props.checkedImageSuccess(imgItem_Id);
    this.props.onsetRenter();
  }

  onClickReName(image_item_name, data) {
    console.log(this, image_item_name, data, "onClickReName9999");
    // console.log(this.props, this.refs.image_name_edit.refs.input.value ,"99999999999999**********");
    this.props.updateImage({name: this.refs.image_name_edit.refs.input.value});
    this.setState({ RenamePopVisible :false });
  }

  onClickCopy() {
    console.log('点击了复制按钮，现在应该添加复制代码');
    this.setState({ CopyPopVisible :false });
  }

  onClickMove() {
    console.log('点击了移动按钮，改变state值');
    this.setState({ MovePopVisible :false });
  }

  onClickDelete() {
    console.log('点击了删除按钮，删除当前state值');
    this.setState({ DeletePopVisible  :false});
  }
  onClosePop(){
    this.setState({
      MovePopVisible: false,
      CopyPopVisible: false,
      DeletePopVisible: false,
      RenamePopVisible: false
    });
  }
  handleRenameVisibleChange(RenamePopVisible) {
    this.setState({ RenamePopVisible });
  }
  handleCopyVisibleChange(CopyPopVisible) {
    this.setState({ CopyPopVisible });
  }
  handleDeleteVisibleChange(DeletePopVisible) {
    this.setState({ DeletePopVisible });
  }
  handleMoveVisibleChange(MovePopVisible) {
    this.setState({ MovePopVisible });
  }


  render() {
    let {imgItemSrc, imageItemName,imageItemValue,imgItemId, data} = this.props;
    //改名
    let RenameContent = (
      <div>
        <Input className="input" placeholder="现在的名字" ref="image_name_edit"/>
        <Button className="button" type="primary" checked={imageItemValue} onClick={this.onClickReName.bind(this, imageItemName, data)}>确定</Button>
        <Button type="ghost" onClick={this.onClosePop.bind(this)}>取消</Button>
      </div>
    );
    //确认复制
    let selectAfter = (
      <div className="ant-rol-12">
        <Button  size="small" className="ant-btn ant-btn-lg" type="primary" onClick={this.onClickCopy.bind(this)}>复制</Button>
      </div>
        );

    //复制容器
    let LinkContent = (
      <div className="ant-rol-12" >
        <Input className="ant-input ant-input-lg" value="当前的链接" disabled={true} addonAfter={selectAfter}/>
      </div>
        );

    //选择分组的单选按钮样式
    let radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    //分组
    let MoveContent = (
      <div>
        <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value}>
          <Radio style={radioStyle} value={"fenzuzhi1"}>分组名称</Radio>
        </RadioGroup>
        <Button className="button" type="primary" onClick={this.onClickMove.bind(this)}>确定</Button>
        <Button type="ghost" onClick={this.onClosePop.bind(this)}>取消</Button>
      </div>
    );
    //删除容器
    let DeleteContent = (
      <div>
        <span>你确定要删除当前图片么？若删除，不会对目前已使用该图片的相关业务造成影响。</span>
        <Button className="button" type="primary" onClick={this.onClickDelete.bind(this)}>确定</Button>
        <Button type="ghost" onClick={this.onClosePop.bind(this)}>取消</Button>
      </div>
    );
    return (

      <Card style={{"width": "160px"}} bodyStyle={{"padding": "0"}}>
        <div className="custom-image">
          <img src={imgItemSrc} alt=""/>
        </div>
        <div className="custom-card">
          <h3><Checkbox onChange={this.onChange.bind(this ,imageItemName,data, imgItemId)} checked={imageItemValue}>{imageItemName}</Checkbox></h3>
          <Popover content={RenameContent} title="更改图片名称" trigger="click" visible={this.state.RenamePopVisible}
                   onVisibleChange={this.handleRenameVisibleChange.bind(this)}>
            <Button>改名</Button>
          </Popover>
          <Popover content={LinkContent} title="复制链接" trigger="click" visible={this.state.CopyPopVisible}
                   onVisibleChange={this.handleCopyVisibleChange.bind(this)}>
            <Button>链接</Button>
          </Popover>
          <Popover content={MoveContent} title="将图片移动到分组：" trigger="click" visible={this.state.MovePopVisible}
                   onVisibleChange={this.handleMoveVisibleChange.bind(this)}>
            <Button>分组</Button>
          </Popover>
          <Popover content={DeleteContent} title="确定是否删除当前图片：" trigger="click" visible={this.state.DeletePopVisible}
                   onVisibleChange={this.handleDeleteVisibleChange.bind(this)}>
            <Button>删除</Button>
          </Popover>
        </div>
      </Card>

    )
  }
}

class ImgContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PopVisible: false,
      indeterminate: true
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
            imageItemValue={item.checked}
            data={data}
            renderItem={this.props.renderItem}
            updateImage={this.props.updateImage}
            onsetRenter={this.props.onsetRenter}
            checkedImageSuccess={this.props.checkedImageSuccess}
          />
        )}
      </div>
    )
  }
}

export class ImageManagesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Menu_current: "default",
      PopVisible: false,
      showUpload: false,
      count:1,
      checkedAll:false,
      renderItem:1
    };
  }
// 点击二级导航，分组导航
  handleClick(e) {
    this.setState({
      Menu_current: e.key,
    });
    this.props.getImages(e.key);
  }

  createGroup() {
    this.props.saveGroupItemData(this.refs.create_group_input.refs.input.value);
    this.setState({
      PopVisible: false,
    });
  }
  onClosePop(){
    this.setState({
      PopVisible: false,
    });
  }

  componentDidMount() {
    this.props.getImages(this.state );
    this.props.getGroups();
  }

  handleVisibleChange(PopVisible) {
    this.setState({ PopVisible });
  }

  //全选按钮事件
  onChange(e) {
    console.log('checkedAll = ', e.target.checked ,this.state);
    this.setState({
      checkedAll: e.target.checked,
      renderItem: this.state.renderItem + 1
    });
    //已经执行这个ALL的 ACTION
    this.props.checkedAllSuccess(e.target.checked);
    this.onsetRenter();
  }
  onsetRenter(){
    this.setState({
      count: this.state.count+1,
      renderItem: this.state.renderItem + 1
    })
  }
  upload(){
    this.refs.imageUploader.getWrappedInstance().setState({visible: true})
    // this.setState({showUpload: true})
  }
  render() {
    let { data,groupsData } = this.props;
    //添加分组AddGroupContent
    let AddGroupContent = (
      <div>
        <Input style={{"marginBottom":"8px"}}placeholder="名称" ref="create_group_input" />
        <Button style={{"marginRight":"6px"}}type="primary" onClick={this.createGroup.bind(this)}>确定</Button>
        <Button type="ghost" onClick={this.onClosePop.bind(this)}>取消</Button>
      </div>
    );
    return (
      <div>
        <div className="image_menu">
          <MenuGroup
            onClick={this.handleClick.bind(this)}
            style={{width: 240}}
            selectedKeys={this.state.Menu_current}
            mode="inline"
          >
            <MenuItemGroup title="我的分组">
              {
                groupsData.groups.map(menu_item=>
                 <MenuGroup.Item key={menu_item.key} >
                   { menu_item.name }
                  </MenuGroup.Item>
                )
              }
            </MenuItemGroup>
            <MenuGroup.Item key="add_menu_btn">
              <Popover
                content={AddGroupContent}
                title="添加分组："
                trigger="click"
                visible={this.state.PopVisible}
                onVisibleChange={this.handleVisibleChange.bind(this)}
              >
                  <Button type="primary" >添加分组</Button>
              </Popover>
            </MenuGroup.Item>
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
            <Button type="primary"  onClick={this.upload.bind(this)}>上传图片</Button>

          </div>
          <ImgContent data={data}
                      menuKey={this.state.Menu_current}
                      updateImage={this.props.updateImage}
                      renderItem={this.state.renderItem}
                      onsetRenter={this.onsetRenter.bind(this)}
                      checkedImageSuccess={this.props.checkedImageSuccess}
          />
        </div>
        <ImageUploader ref="imageUploader" visible={this.state.showUpload}></ImageUploader>
      </div>
    );
  }
}

//redux
function mapStateToProps(state) {
  return {data: state.images.data , groupsData: state.images.groupsData};
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
    getGroups: (params) => {
      dispatch(getGroups())
    },
    saveGroupItemData: (params)=>{
      dispatch(saveGroup(params)).then(()=> {
        dispatch(getGroups())
      })
    },
    updateImage: (params)=>{
      dispatch(updateImage(params)).then(()=> {
        dispatch(getImages())
      })
    },
    checkedAllSuccess:(checkedAll)=>{
      dispatch(checkedAllSuccess(checkedAll))
    },
    checkedImageSuccess: (id)=>{
      dispatch(checkedImageSuccess(id))
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageManagesIndex);
