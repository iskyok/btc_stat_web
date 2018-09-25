import React from 'react';
import {Button,Popconfirm, Checkbox, Radio, Tabs, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getSetting, getsettings, saveSetting, updateSetting} from '../../../reducers/actions/fx/settings';
import {connect} from 'react-redux';
import {API_CONFIG} from '../../../config/api';
import fetch from 'isomorphic-fetch';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _  from 'lodash';
require('es6-promise').polyfill();
const TabPane = Tabs.TabPane;

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
      Itemvisible: true,
      New: false,
      fetching: false,
      visible: this.props.visible,
      dataOptions: []
    };
  },

  componentDidMount() {
    this.props.getItemData();
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
  },

  //
  callback(key){
    console.log(key);
  },
  onChangeRadio(e){
    alert("kkk")
    this.setState({radioValue: e.target.value})
  },
  //提交表单
  onSubmit(){
    console.log("ttt",this)
    let form = this.props.form;
    let params = form.getFieldsValue();

    params.setting.key = 'apply';

    var that=this;
    form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      console.log(params ,"rrrrrrrrrrrrrssssssssssss")
      that.props.updateItemData(params)
    })
  },
  //提交表单
  onSubmitAudio(){
    console.log("ttt",this)
    let form = this.props.form;
    let params = form.getFieldsValue();

    params.audio.key = 'audio';

    var that=this;
    form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      console.log(params ,"rrrrrrrrrrrrrssssssssssssaudio")
      that.props.updateItemData(params)
    })
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
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="分销人数限制" key="1">
            <Form horizontal form="fx_people">
              <FormItem {...formItemLayout} label="限制分销人数">
                <Input id="setting.limit" {...getFieldProps("setting.value.limit")}  type="text" autoComplete="off" style={{"width": "20%"}}/>
              </FormItem>
              <FormItem {...formItemLayout} label="剩余分销人数">
                <Input id="setting.remin" {...getFieldProps("setting.value.remin")}  type="text" autoComplete="off" style={{"width": "20%"}}/>
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Popconfirm title="确定提交？" placement="right" onConfirm={this.onSubmit}>
                  <Button type="primary">提交</Button>
                </Popconfirm>
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="分销商审核" key="2">
            <Form horizontal form="fx_audit">
              <FormItem {...formItemLayout} label="审核方式">
                <RadioGroup onChange={this.onChangeRadio.bind(this)} {...getFieldProps("audit_setting_value")} >
                  <Radio style={radioStyle} value="0">不需要审核</Radio>
                  <Radio style={radioStyle} value="1">需要人工审核</Radio>
                  <Radio style={radioStyle} value="2"> 自动审核{ <Input  placeholder="成交金额" style={{width: 100, marginLeft: 10}}/>}
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 8 }}>
                <Popconfirm title="确定提交？" placement="right" onConfirm={this.onSubmitAudio}>
                  <Button type="primary">提交</Button>
                </Popconfirm>
              </FormItem>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    )
  }
})

//redux动作
function formMapStateToProps(state) {
  console.log(state, "----------------state")
  return {
    itemData: state.fx_settings.itemData||{}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getItemData: () => {
      dispatch(getSetting())
    },
    saveItemData: (params) => {
      dispatch(saveSetting(params)).then(() => {
        dispatch(getSetting())
      })
    },
    updateItemData: (params) => dispatch(updateSetting(params))
  }
}
let NewForm = createForm({
  mapPropsToFields(props) {
    let result = {};
    if(!!props.itemData['setting']){
      result['setting']={key : "apply",value : {
        limit :{value :props.itemData['setting']['value']['limit']},
        remin :{value :props.itemData['setting']['value']['remin']}
      }}
      // result["setting.value.limit"] = {value: props.itemData['setting']['value']['limit'],key :'apply'};
      // result["setting.value.remin"] = {value: props.itemData['setting']['value']['remin'],key :'apply'};
    }
    if(!!props.itemData['audit_setting']) {
      result["audit_setting_value"] = {value: props.itemData['audit_setting']['value']};
    }
      console.log("rrr",result)
    return result;
  }
})(MyForm);

let FxSettingsIndex = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(NewForm);

export default FxSettingsIndex;
