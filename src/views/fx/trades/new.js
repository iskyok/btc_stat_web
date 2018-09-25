import React from 'react';
import {Button, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getTrade, getTrades, saveTrade, updateTrade} from '../../../reducers/actions/fx/trades';
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
    if (this.props.formType == "lookForm" ){
      this.setState({
        Itemvisible: true
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
    var myDate = new Date();
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };
    var that = this;
    return (<Form horizontal form={this.props.form}>

      {
        this.props.formType != "newForm"
          ? <FormItem {...formItemLayout} label="ID">
              <span>{this.props.itemData['id']}</span>
             </FormItem>
          : null
      }

      <FormItem {...formItemLayout} label="名称">
        <Input {...getFieldProps("trade.name", requiredConf())} type="text" autoComplete="off" disabled={this.state.Itemvisible}/>
      </FormItem>

      <FormItem {...formItemLayout} label="分成用户">
        <Input {...getFieldProps("trade.transations_dealer_level", requiredConf())} type="text" autoComplete="off" disabled={this.state.Itemvisible}/>
      </FormItem>

      <FormItem {...formItemLayout} label="创建时间">
        {
          this.props.formType != "newForm"
           ? <span>{this.props.itemData['created_at']}</span>
            : <span>{myDate.toLocaleDateString()}</span>
        }
      </FormItem>

      <FormItem {...formItemLayout} label="修改时间">
        {
          this.props.formType != "newForm"
          ? <span>{this.props.itemData['updated_at']}</span>
            : <span>{myDate.toLocaleDateString()}</span>
        }
      </FormItem>

    </Form>)
  }
})

function formMapStateToProps(state) {
  return {
    itemData: state.fx_trades.itemData
  };
}
//redux动作
function mapDispatchToProps(dispatch) {
  return {
    getItemData: (params) => dispatch(getTrade(params)),
    saveItemData: (params)=>{
       dispatch(saveTrade(params)).then(()=> {
         dispatch(getTrades())
       })
    },
    updateItemData: (id, params) => dispatch(updateTrade(id, params))
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
        if ( props.formType === "newForm"){
          return result ;

        }else{

    for (let prop in props.itemData) {
       result["trade." + prop] = {value: props.itemData[prop].toString()}
      if(prop=="user"){
        for (let prop in props.itemData['user']) {
          result["trade.user_"+prop] = {value: props.itemData['user'][prop].toString()};
        }
      }
      else if(prop=="transations") {
        for (let prop in props.itemData['transations']) {
          result["trade.transations_" + prop] = {value: props.itemData['transations'][prop].toString()};
        }
      }
    }
    return result;
        }
  }
})(MyForm);

let NewForm = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);

let TradeNew = React.createClass({
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

export default TradeNew;
