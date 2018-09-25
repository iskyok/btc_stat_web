import React from 'react';
import {Button, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getTaxRate, gettax_rates, saveTaxRate, updateTaxRate} from '../../../reducers/actions/fx/tax_rates';
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
    var that = this;
    return (<Form horizontal form={this.props.form}>

      <FormItem {...formItemLayout} label="账户">
        <Input {...getFieldProps("tax_rate.account", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="名称">
        <Input {...getFieldProps("tax_rate.user_name", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="月份">
        <Input {...getFieldProps("tax_rate.date", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="计税金额">
        <Input {...getFieldProps("tax_rate.total_amount", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="扣税">
        <Input {...getFieldProps("tax_rate.amount", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="余额转入">
        <Input {...getFieldProps("tax_rate.balance_income", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="是否结算">
        <Input {...getFieldProps("tax_rate.state_name", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

      <FormItem {...formItemLayout} label="创建时间">
        <Input {...getFieldProps("tax_rate.created_at", requiredConf())} type="text" autoComplete="off"/>
      </FormItem>

    </Form>)
  }
})

function formMapStateToProps(state) {
  return {
    itemData: state.fx_tax_rates.itemData
  };
}
//redux动作
function mapDispatchToProps(dispatch) {
  return {
    getItemData: (params) => dispatch(getTaxRate(params)),
    saveItemData: (params)=>{
       dispatch(saveTaxRate(params)).then(()=> {
         dispatch(getTaxRates())
       })
    },
    updateItemData: (id, params) => dispatch(updateTaxRate(id, params))
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
        if ( props.formType === "newForm"){

          return result ;

        }else{
          for (let prop in props.itemData) {
             result["tax_rate."+prop] = {value: props.itemData[prop].toString()};
            if(prop=="user"){
              for (let prop in props.itemData['user']) {
                result["tax_rate.user_"+prop] = {value: props.itemData['user'][prop].toString()};
              }
             }
           }
          return result;
        }
  }
})(MyForm);

let NewForm = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);

let TaxRateNew = React.createClass({
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
    console.log(form.props , params , "------------form,params")
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

export default TaxRateNew;
