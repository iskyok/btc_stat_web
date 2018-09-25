import React from 'react';
import {Button, Checkbox, Radio, Upload, Icon, Cascader, Select, Form, message, Input, Modal} from 'antd';
import {getUser, getUsers, saveUser, updateUser, moveRelationToSchool} from '../../../reducers/actions/fx/users';
import {connect} from 'react-redux';
import {API_CONFIG} from '../../../config/api';
import fetch from 'isomorphic-fetch';
const createForm = Form.create;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _  from 'lodash';
require('es6-promise').polyfill();
import SearchUser from "../../shared/search_user";
import {push} from 'react-router-redux';
import SearchSchool from "../../shared/search_school"

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
      checked: true,
      dataOptions: []
    };
  },

  componentDidMount() {
    console.log(this.state, this.props, '666666666');
    let itemId = this.props.itemId;
    if (itemId) {
      this.props.getItemData(itemId);
    }
  },

  handleCancel() {
    this.props.closeForm()
  },
  handleChange(value) {
    console.log(`selected ${value}`);
  },
  handleSubmit() {
    let {form} = this.props;
    let params = form.getFieldsValue();
    console.log(this.props.form.getFieldsValue());
    form.validateFields((errors) => {
      if (errors) {
        return false;
      }
      let school_id = this.refs.SearchSchool.state.selectValue;
      console.log("uuuu---------", this.refs.SearchSchool.state);
      if (!!!school_id) {
        message.error("请选择上级目标用户")
        return false
      }
      params["school_id"] = school_id;
      if (this.props.itemId) {
        this.props.moveRelationToSchool(this.props.itemId, params);
      }
    });
  },
  // 只展示最后一项
  displayRender(label) {
    return label[label.length - 1];
  },
  onCateChange(value){
    console.log(`分类选择 ${value}`);
  },
  componentWillReceiveProps(){
    if (this.props.formType == "newForm") {
      this.setState({
        Itemvisible: true,
        NotNew: false
      })
    } else if (this.props.formType == "editForm") {
      this.setState({
        Itemvisible: true,
        NotNew: true
      })
    } else {
      this.setState({
        Itemvisible: true,
        NotNew: true
      })
    }
  },
  getImageUrl(){
    return this.state.imageUrl;
  },
  onCheckedChange(e){
    this.setState({
      checked: e.target.checked,
    });
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
      <Modal title={this.props.title} visible={true} onOk={this.handleSubmit.bind(this)}
             onCancel={this.handleCancel.bind(this)}>
        <Form horizontal form={this.props.form}>
          <FormItem {...formItemLayout} label="当前用户">
            <div>
              {this.props.itemData.account ?
                this.props.itemData.account.nickname + "-" + this.props.itemData.account.phone : null
              }
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="目标学校">
            <div>
              <SearchSchool ref="SearchSchool"></SearchSchool>
            </div>
          </FormItem>

        </Form>
      </Modal>)
  }
})

function formMapStateToProps(state) {
  return {
    itemData: state.fx_users.itemData
  };
}
//redux动作
function mapDispatchToProps(dispatch, ownProps) {
  return {
    getItemData: (params) => dispatch(getUser(params)),
    getUsers: (params) => dispatch(getUsers(params)),
    saveItemData: (params) => {
      dispatch(saveUser(params)).then(() => {
        dispatch(getUsers())
      })
    }, moveRelationToSchool: (id, params) => {
      dispatch(moveRelationToSchool(id, params)).then(() => {
        ownProps.closeForm()
        dispatch(getUsers(ownProps.location.query))
      })
    },
    pushQuery: (params) => {
      dispatch(push(params))
    },
    updateItemData: (id, params) => dispatch(updateUser(id, params))
  }
}
MyForm = createForm({
  mapPropsToFields(props) {
    let result = {};
    for (let prop in props.itemData) {
      result["user." + prop] = {value: props.itemData[prop]}
      if (prop == "level") {
        for (let prop in props.itemData['level']) {
          result["user.level_" + prop] = {value: props.itemData['level'][prop].toString()};
        }
      } else if (prop == "info") {
        for (let prop in props.itemData['info']) {
          result["user.info_" + prop] = {value: props.itemData['info'][prop].toString()};
        }
      }
    }
    return result;

  }
})(MyForm);

let EditCompany = connect(formMapStateToProps, mapDispatchToProps, null, {withRef: true})(MyForm);

export default EditCompany;
