import React from 'react';
import {Button, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getInvite, getinvites, saveInvite, updateInvite} from '../../../reducers/actions/fx/invites';
import {connect} from 'react-redux';
import {API_CONFIG} from '../../../config/api';
import fetch from 'isomorphic-fetch';
const createForm = Form.create;
const FormItem = Form.Item;
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
      Itemvisible: false ,
      New:false,
      fetching: false,
      visible: this.props.visible,
      dataOptions: []
    };
  },

  componentDidMount() {
    console.log(this.state,this.props ,'666666666');
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
    var that = this;
    return (<Form horizontal form={this.props.form}>

      <FormItem {...formItemLayout} label="被邀请者">
        <Input {...getFieldProps("invite.user_name", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="升级等级">
        <Input {...getFieldProps("invite.user_level", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="邀请人">
        <Input {...getFieldProps("invite.user_byer_name", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="邀请人等级">
        <Input {...getFieldProps("invite.user_byer_level", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="邀请时间" >
        <Input {...getFieldProps("invite.created_at", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

    </Form>)
  }
})

function formMapStateToProps(state) {
  return {
    itemData: state.fx_invites.itemData
  };
}
//redux动作
function mapDispatchToProps(dispatch) {
  return {
    getItemData: (params) => dispatch(getInvite(params)),
    saveItemData: (params)=>{
       dispatch(saveInvite(params)).then(()=> {
         dispatch(getInvites())
       })
    },
    updateItemData: (id, params) => dispatch(updateInvite(id, params))
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
        if ( props.formType === "newForm"){

          return result ;

        }else{

    for (let prop in props.itemData) {
       result["invite." + prop] = {value: props.itemData[prop].toString()}
      if(prop=="user"){
        for (let prop in props.itemData['user']) {
          result["invite.user_"+prop] = {value: props.itemData['user'][prop].toString()};
        }
      }
      else if(prop=="used_byer") {
        for (let prop in props.itemData['used_byer']) {
          console.log(props.itemData['used_byer'] ,prop, '99999999----');
          result["invite.user_byer_" + prop] = {value: props.itemData['used_byer'][prop].toString()};
        }
      }
    }
    console.log(result , "6669999999999999999999999");
    return result;
        }
  }
})(MyForm);

let NewForm = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);

let InviteNew = React.createClass({
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

export default InviteNew;
