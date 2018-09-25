import React from 'react';
import {Button, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getUser, getusers, saveUser, updateUser} from '../../../reducers/actions/fx/users';
import {connect} from 'react-redux';
import {API_CONFIG} from '../../../config/api';
import fetch from 'isomorphic-fetch';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _  from 'lodash';
require('es6-promise').polyfill();
import { uploadProps, requiredConf} from '../../../utils/helper';

async function getUpToken() {
  return await fetch(API_CONFIG.host + '/admin/assets/uptoken')
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      return data.uptoken
    })
}
let MyForm = React.createClass({
  getInitialState() {
    return {
      priviewVisible: false,
      priviewImage: '',
      showUpload: '',
      imageUrl: '',
      Itemvisible: true ,
      New:false,
      fetching: false,
      visible: this.props.visible,
      dataOptions: []
    };
  },

  componentDidMount() {
    let itemId = this.props.modal.state.itemId;
    if (itemId) {
      this.props.getItemData(itemId);
    }
  },

  handleCancel() {
    this.setState({
      priviewVisible: false,
    });
  },
  handleChange(value) {
    console.log(`selected ${value}`);
  },
  handleSubmit() {
    console.log(this.props.form.getFieldsValue());
    this.props.modal.hideModal();
  },
  // 只展示最后一项
  displayRender(label) {
    return label[label.length - 1];
  },
  onCateChange(value){
    console.log(`分类选择 ${value}`);
  },
  componentWillReceiveProps(){
    if (this.props.formType == "newForm" ){
      this.setState({
        Itemvisible: true,
        NotNew:false
      })
    }else if(this.props.formType == "editForm"){
      this.setState({
        Itemvisible: true,
        NotNew:true
      })
    }else{
      this.setState({
        Itemvisible: true,
        NotNew:true
      })
    }
  },
  getImageUrl(){
    return this.state.imageUrl;
  },
  render(){
    const {getFieldProps} = this.props.form;
    const Option = Select.Option;
    let children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    var that = this;
    return (
      <Form horizontal form={this.props.form}>
        <FormItem {...formItemLayout} label="名称">
          <Input {...getFieldProps("user.name")} type="text" disabled={true} autoComplete="off"/>
        </FormItem>
        <FormItem {...formItemLayout} label="等级">
          <Input {...getFieldProps("user.level_name")} autoComplete="on" type="text"/>
        </FormItem>
        <FormItem {...formItemLayout} label="分销统计">
         <p>个人总收入：{this.props.itemData['total_amount']}元</p>
         <p>个人余额： {this.props.itemData['fx_bang_amount']}元</p>
         <p>本月收入：{this.props.itemData["info"]['current_month_amount']}元</p>
         <p>上月收入：{this.props.itemData["info"]['last_month_amount']}元</p>
         <hr/>
          <p>个人总返利{this.props.itemData["info"]['amount']}元</p>
          <p>一级分销商{this.props.itemData["info"]['dealer1_count']}个，金额：{this.props.itemData["info"]['amount1']}元</p>
          <p>二级分销商{this.props.itemData["info"]['dealer2_count']}个，金额：{this.props.itemData["info"]['amount2']}元</p>
          <p>三级分销商{this.props.itemData["info"]['dealer3_count']}个，金额：{this.props.itemData["info"]['amount3']}元</p>
        </FormItem>
        <FormItem {...formItemLayout} label="审核">
          <RadioGroup onChange={this.onChange} value={this.props.itemData['info']['state_name']} >
            <Radio style={radioStyle} value="待激活">待激活</Radio>
            <Radio style={radioStyle} value="审核中">审核中</Radio>
            <Radio style={radioStyle} value="通过">通过</Radio>
            <Radio style={radioStyle} value="未通过">未通过</Radio>
          </RadioGroup>
        </FormItem>
      </Form>)
  }
})

function formMapStateToProps(state) {
  console.log(state.fx_users , "999999999999999999999999")
  return {
    itemData: state.fx_users.itemData
  };
}
//redux动作
function mapDispatchToProps(dispatch) {
  return {
    getItemData: (params) => dispatch(getUser(params)),
    saveItemData: (params)=>{
       dispatch(saveUser(params)).then(()=> {
         dispatch(getUsers())
       })
    },
    updateItemData: (id, params) => dispatch(updateUser(id, params))
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
    for (let prop in props.itemData) {
       result["user." + prop] = {value: props.itemData[prop]}
      if(prop=="level"){
        for (let prop in props.itemData['level']) {
          result["user.level_"+prop] = {value: props.itemData['level'][prop].toString()};
        }
      }else if(prop=="info"){
        for (let prop in props.itemData['info']) {
          result["user.info_"+prop] = {value: props.itemData['info'][prop].toString()};
        }
      }
    }
    console.log(result,props ,"**********************")
    return result;


  }
})(MyForm);

let NewForm = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);

let UserNew = React.createClass({
  getInitialState() {
    return {visible: false, itemId: "",};
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.refs.newForm) {
      let form = this.refs.newForm.getWrappedInstance()
      if (this.state.visible && this.state.visible != prevState.visible) {
        form.resetFields()
        if (this.state.itemId) {
          form.props.getItemData(this.state.itemId)
        }
      }
    }
  },
  showModal(item) {
    this.setState({visible: true, itemId: item.id});
  },
  hideModal() {
    this.setState({visible: false});
  },
  handleOk(){
    let form = this.refs.newForm.getWrappedInstance()
    let params = form.getFieldsValue();
    form.validateFields((errors) => {
    if (errors) {
      return false;
    }
    if (this.state.itemId) {
      form.props.updateItemData(this.state.itemId, params)
    } else {
      form.props.saveItemData(params)
    }
    this.hideModal()
  });

  },
  render() {
    return (
      <div>
        <Modal title={this.props.title} visible={this.state.visible} onOk={this.handleOk} onCancel={this.hideModal}>
          <NewForm ref="newForm" modal={this} visible={this.state.visible} formType={this.props.formType}></NewForm>
        </Modal>
      </div>
    );
  },
});

export default UserNew;
